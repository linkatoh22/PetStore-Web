const Product = require("../../models/ProductModel")
const User = require("../../models/userModel");
const Cart = require("../../models/CartModel")
const Pet = require("../../models/PetModel")

const AddToCart = async (req,res,next) =>{
    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("AddToCart: ", fullUrl);

        var price=0;
        const {itemType,item,variant,quantity} = req.body;
        const userId = req.user._id;
        
        
        if(!itemType||!item||!quantity) {
            res.status(400);
            throw Error("Missing required field")
        }

        if(!['Product','Pet'].includes(itemType)){
            res.status(400);
            throw Error(`Invalid itemType: ${itemType}`)
        }

        let cart = await Cart.findOne({user:userId});
        
        if(!cart){
            cart = new Cart({user:userId,items:[],totalPrice:0})
        }

        if(itemType==='Product'){

            if(!variant){
                res.status(400);
                throw Error("Variant is required for product")
            }

            const foundProduct = await Product.findById(item);

            if(!foundProduct){
                res.status(404);
                throw Error("Product not found")
            }
            const foundVariants = foundProduct.variants.id(variant)

            
            const itemIndex= cart.items.findIndex(
                CartItem=>
                    (
                        CartItem?.variant?.toString() === variant && 
                        CartItem?.item?.toString() === item
                    )
            )
            
            if(itemIndex!=-1){

                const updateQuantity = cart.items[itemIndex].quantity + quantity;

                if(updateQuantity>foundVariants.stock){
                    res.status(400);
                    throw Error("Quantity exceed stock")
                }

                cart.items[itemIndex].quantity = updateQuantity;
                await cart.save();
                return res.status(200).json({
                    message:"Updated Quantity Successfully",
                    status:"Success",
                    code:200,
                    cart
                })

            }
            
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
            const itemIndex = cart.items.findIndex(CartItem=>(CartItem.item.toString() === item))

            if(itemIndex!=-1){
                const updatedQuantity = cart.items[itemIndex].quantity +quantity;
                if(updatedQuantity> foundPet.quantity){
                    res.status(400);
                    throw Error("Quantity exceed stock")
                }
                cart.items[itemIndex].quantity=updatedQuantity;
                cart.items[itemIndex].price=foundPet.price* updatedQuantity;
                
                await cart.save();
                return res.status(200).json({
                    message:"Updated Quantity Successfully",
                    status:"Success",
                    code:200,
                    cart
                })
            }

            if(!foundPet){
                res.status(404);
                throw Error("Pet not found");
            }
            price=foundPet.price;
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

const GetCartActive = async(req,res,next)=>{
    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("GetCart: ", fullUrl);

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
        cart = await Cart.findOne({user:userId})
        
        const infoCart = JSON.parse(JSON.stringify(cart));
        infoCart.items = infoCart.items.filter((item)=> item.status =="Đủ hàng"|| item.status =="Không đủ hàng")

        await Promise.all(infoCart.items.map(async (item,index)=>{
                
                if(item.itemType === "Product" ){
                    const product = await Product.findById(item.item)
                    const infoProduct = JSON.parse(JSON.stringify(product));
                   
                    infoProduct.variants = infoProduct.variants.filter( vr => vr._id == item.variant )
                    infoCart.items[index].productItem = infoProduct;

                    
                }
                else if(item.itemType === "Pet"){
                    
                    const pet = await Pet.findById(item.item)
                    infoCart.items[index].productItem = pet;
                }
        
            }
        ));
       
        return res.status(200).json({
            message:"Get Cart Successfully",
            status:"Success",
            code:200,
            infoCart
        })

    }
    catch(error){
        
        next(error)
    }
}

const GetItemUnactive = async (req,res,next)=>{
    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("GetCart: ", fullUrl);

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
        cart = await Cart.findOne({user:userId})
        
        const infoCart = JSON.parse(JSON.stringify(cart));
        
        infoCart.items = infoCart.items.filter(  (item)=> item.status =="Hết hàng" || item.status =="Ngừng kinh doanh"    )

        await Promise.all(infoCart.items.map(async (item,index)=>{
                
               if(item.itemType === "Product" ){
                    const product = await Product.findById(item.item)
                    const infoProduct = JSON.parse(JSON.stringify(product));
                   
                    infoProduct.variants = infoProduct.variants.filter( vr => vr._id == item.variant )
                    infoCart.items[index].productItem = infoProduct;

                    
                }
                else if(item.itemType === "Pet"){
                    
                    const pet = await Pet.findById(item.item)
                    infoCart.items[index].productItem = pet;
                }
        
            }
        ));
       
        return res.status(200).json({
            message:"Get Cart Unactive Successfully",
            status:"Success",
            code:200,
            infoCart
        })
    }
    catch(error){
         next(error)
    }

}

const EditCart = async(req,res,next)=>{
    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("EditCart: ", fullUrl);


        const {add,minus,amount,cartItem} = req.query;
        
        const userId = req.user._id;
        if(!userId){
            res.status(400);
            throw Error("User not found")
        }
        if(!cartItem){
            res.status(400);
            throw Error("Cart Item's id is required")
        }

        const cart = await Cart.findOne({user:userId});
        
        if(!add && !minus && !amount){
            res.status(400);
            throw Error("Choose one operation (add, minus, amount) must be specified");
        }

        if(!cart){
            res.status(404);
            throw Error("Cart not found")
        }
        
        const itemIndex = cart.items.findIndex(item => item._id.toString() === cartItem);
        
        if(itemIndex === -1){
            res.status(404);
            throw Error("Cart item not found")
        }
        const product = await Product.findOne({_id:cart.items[itemIndex].item});
        
        
        const variant = product.variants.id(cart.items[itemIndex].variant);
        
        if(itemIndex===-1){
            res.status(404);
            throw Error("Cart item not found");
        }

        if(add){

            const cartItemAdd = cart.items[itemIndex].quantity+1;
            
            if(cartItemAdd>variant.stock){
                res.status(400)
                throw Error("Don't have enough stock to add to cart")
            }
            
            cart.items[itemIndex].quantity+=1;
            cart.totalPrice+=cart.items[itemIndex].price;


        }
        else if(minus){
            //Trừ bth => Check xem có đổi state đc ko
            //Trừ 1 thành 0 => Delete item luôn
            if(cart.items[itemIndex].quantity > 1){
                const cartItemMinus = cart.items[itemIndex].quantity-1;

                cart.items[itemIndex].quantity-=1;
                cart.totalPrice-=cart.items[itemIndex].price;

                if(cartItemMinus<=variant.stock && (cart.items[itemIndex].status !="Đủ hàng")){
                    
                    cart.items[itemIndex].status ="Đủ hàng"
                    
                }
                

            }
            else if(cart.items[itemIndex].quantity == 1){

                cart.items.splice(itemIndex,1);
                cart.totalPrice = cart.items.reduce((total,item)=>total + (item.price * item.quantity),0);
            }
            
        }
        else if(amount){
            if(variant.stock<amount){
                res.status(400)
                throw Error("Amount edit greater than variant stock");
            }

            cart.items[itemIndex].quantity=amount;
            cart.totalPrice = cart.items.reduce((total,item)=>total + (item.price * item.quantity),0);
            if((cart.items[itemIndex].status !="Đủ hàng")){
                cart.items[itemIndex].status ="Đủ hàng"
            }

            
            
        }
        
        await cart.save();
        
        return res.status(200).json({
            message:"Edit Cart Successfully",
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
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("DeleteItem: ", fullUrl);
        
        
        const {cartItemId} = req.body;
        
        const idsToDelete = Array.isArray(cartItemId) ? cartItemId.map((item)=>item.toString()) : [cartItemId.toString()];
        

        const userId = req.user._id;
        if(!userId){
            res.status(404);
            throw Error("User not found")
        }
        if(!cartItemId){
            res.status(400)
            throw Error("Cart Item Id is required");
        }
        const cart = await Cart.findOne({user:userId});

        
        
        if(!cart){
            res.status(404);
            throw Error("Cart not found")
        }

        

        idsToDelete.map( (id)=>{
                
                const itemIndex = cart.items.findIndex(item => item._id.toString() === id);
                
                if(itemIndex === -1){
                    res.status(404);
                    throw Error("Cart item not found")
                }   
                cart.items.splice(itemIndex,1);
            }  
        )
        
        cart.totalPrice = cart.items.reduce((total,item)=>total + (item.price * item.quantity),0);
        
        await cart.save();

        return res.status(200).json({
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
module.exports = {AddToCart,GetCartActive,EditCart,DeleteItem,GetItemUnactive}