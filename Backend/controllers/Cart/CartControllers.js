const Product = require("../../models/ProductModel")
const User = require("../../models/userModel");
const Cart = require("../../models/CartModel")
const Pet = require("../../models/PetModel")

const AddToCart = async (req,res,next) =>{
    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("AddToCart: ", fullUrl);
        let price=0;
        const {itemType,item,variant,quantity} = req.body;
        
        
        if(!itemType||!item||!quantity) {
            res.status(400);
            throw Error("Missing required field")
        }

        if(!['Product','Pet'].includes(itemType)){
            res.status(400);
            throw Error(`Invalid itemType: ${itemType}`)
        }

        if(itemType==='Product'){

            const foundProduct = await Product.findById(item);
            
            if(!foundProduct){
                res.status(404);
                throw Error("Product not found")
            }

            if(!variant){
                res.status(400);
                throw Error("Variant is required for product")
            }

            const foundVariants = foundProduct.variants.id(variant)

            if(quantity<1){
                
                res.status(400)
                throw Error("Quantity must be greater than 0")
            }
            else if(foundVariants.stock<quantity){

                res.status(400)
                throw Error("Quantity exceed the stock")
            
            }
            price=foundVariants.price;


        }
        else if(itemType==="Pet"){
            const foundPet = await Pet.findById(item);
            if(!foundPet){
                res.status(404);
                throw Error("Pet not found");
            }
        }
        const userId = req.user._id;
        
        let cart = await Cart.findOne({user:userId});
        
        if(!cart){
            cart = new Cart({user:userId,items:[],totalPrice:0})
        }

        cart.items.push({
            itemType,
            item,
            variant: itemType === 'Product'? variant:undefined,
            quantity,
            price,
            status:"Đủ hàng"
        });

        cart.totalPrice +=price * quantity;
        await cart.save();

        return res.status(200).json({
            message:"Add item to cart Successfully",
            status:"Success",
            code:200,
            cart
        })
        
    }
    catch(error){
        next(error)
    }
}

const GetCart = async(req,res,next)=>{
    try{
        
        const FindProductVariants = async (item,variant,products)=>{
            const product = products.find(product=>product.id.toString() === item.toString())
            const VariantFound = product.variants.id(variant);
            return VariantFound;
        }

        const userId = req.user._id;
        if(!userId){
            res.status(404);
            throw Error("No user found");
        }
        let cart = await Cart.findOne({user:userId});

        if(!cart){
            cart = new Cart({user:userId,items:[],totalPrice:0})
            await cart.save();
            
        }
        else{
            const variantIds = cart.items.map((item)=>item.variant);
            const itemIds = cart.items.map((item)=>item.item);

            const products = await Product.find(
                {_id:{$in:itemIds},"variants._id":{$in:variantIds}},
                {variants:1}
            )

            for(const cartItem of cart.items){
                
                    const variantFound = await FindProductVariants(cartItem.item,cartItem.variant,products);
                    
                    if(variantFound.stock==0 && cartItem.status!=="Hết hàng"){
                        
                        await Cart.updateOne(
                            {
                                _id:cart._id, "items.variant":cartItem.variant
                            },
                            {
                                $set:{"items.$[elem].status":"Hết hàng"}
                            },
                            {
                                arrayFilters:[{"elem.variant":cartItem.variant}]
                            }
                        )
                    }
                    else if(variantFound.stock<cartItem.quantity && cartItem.status!=="Không đủ hàng"){
                        
                        await Cart.updateOne(
                            {
                                _id:cart._id, "items.variant":cartItem.variant
                            },
                            {
                                $set:{"items.$[elem].status":"Không đủ hàng"}
                            },
                            {
                                arrayFilters:[{"elem.variant":cartItem.variant}]
                            }
                        )
                    }
                    else if(variantFound.stock>cartItem.quantity && (cartItem.status==="Hết hàng"||cartItem.status==="Không đủ hàng")){
                        await Cart.updateOne(
                            {
                                _id:cart._id, "items.variant":cartItem.variant
                            },
                            {
                                $set:{"items.$[elem].status":"Đủ hàng"}
                            },
                            {
                                arrayFilters:[{"elem.variant":cartItem.variant}]
                            }
                        )
                    }
                }
        }
        cart = await Cart.findOne({user:userId})
        return res.status(200).json({
            message:"Get Cart Successfully",
            status:"Success",
            code:200,
            cart
        })

    }
    catch(error){
        console.log(error);
        next(error)
    }
}

const EditCart = async(req,res,next)=>{
    try{

        res.status(200).json({
            message:"Get Detail Cart Successfully",
            status:"Success",
            code:200,
            cart
        })
    }
    catch(error){
        next(error)
    }
}

const DeleteItem= async (req,res,next)=>{
    try{
        // const cartItemId = req.params;
        // const userId = req.user._id;
        // if(!cartItemId){
        //     res.status(400)
        //     throw Error("Cart Item Id is required");
        // }
        // const cart = await Cart.findOne({user:userId});
        res.status(200).json({
            message:"Delete item in Cart Successfully",
            status:"Success",
            code:200,
            cart
        })
    }
    catch(error){
        next(error)
    }
}
module.exports = {AddToCart,GetCart,EditCart}