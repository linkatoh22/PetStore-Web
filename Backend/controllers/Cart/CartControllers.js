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
        
        // const FindProductVariants = async (item,variant)=>{
        //     const ProductFound = await Product.findOne({_id:item});
        //     const VariantFound = ProductFound.variants.id(variant)
        //     return VariantFound;

        // }

        // const userId = req.user._id;
        // if(!userId){
        //     res.status(404);
        //     throw Error("No user found");
        // }
        // const cart = await Cart.findOne({user:userId});

        // if(!cart){
        //     cart = new Cart({user:userId,items:[],totalPrice:0})
        //     await cart.save();
        //     return res.status(200).json({
        //         message:"Get Cart Successfully",
        //         status:"Success",
        //         code:200,
        //         cart
        //     })
            
        // }
        
        // cart.items.map(async (cartItem)=>{
        //     const variantFound = FindProductVariants(cartItem.item,cartItem.variant);
        //     if(variantFound.stock<cartItem.quantity){
        //         await Cart.updateOne({_id:cart._id,"items.variant":cartItem.variant},{$set:{}})
        //     }
        // })


        

        return res.status(200).json({
            message:"Get Cart Successfully",
            status:"Success",
            code:200,
            cart
        })

    }
    catch(error){
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

module.exports = {AddToCart,GetCart,EditCart}