const Order = require("../../models/OrderModel");
const Product = require("../../models/ProductModel");
const Pet = require("../../models/PetModel")
const createOrder = async(req,res,next) =>{

    try{
        const saveTasks = [];
        const userId = req.user._id;
        const {items,shippingInfo} = req.body;
        
        if(!items || items.length === 0){
            res.status(400);
            throw new Error("Order must contain at least one item")
        }
        if(!shippingInfo) {
            res.status(400);
            throw Error("Shipping info is required")
        }

        const productIds = items.map(item=>item.item); //LÂÝ ID CỦA CÁC ITEM TRONG ORDER

        //products
        const products = await Product.find({_id:{$in:productIds}})
        const productMap = {};
        
        products.forEach(product=>{
            productMap[product._id.toString()] = product;
        })

        //pets
        const pets = await Pet.find({_id:{$in:productIds}});
        const petsMap = {};

        pets.forEach( pet=>{
            petsMap[pet._id.toString()] = pet;
        })

        for (const item of items){
            if(item.itemType === "Product" && item.variant){
                const product = productMap[item.item.toString()];

                if(!product){
                    res.status(404);
                    throw Error(`Product not found for item ${item.item}`)
                }
                const variant = product.variants.id(item.variant);
                if(!variant){
                    res.status(404)
                    throw new Error(`Variant not found for products ${item.item}`)
                }

                if(variant.stock<item.quantity){
                    res.status(400);
                    throw new Error(`Not enough stock for variant of product ${item.item}`)
                }
                // variant.stock = variant.stock -  item.quantity;
                // await product.save();
            }
            else if(item.itemType === "Pet"){
                const pet = petsMap[item.item.toString()]
                if(!pet){
                    res.status(404)
                    throw new Error(`Not found for pet ${item.item}`)
                }
                if(pet.quantity<item.quantity){
                    res.status(400);
                    throw new Error(`Not enough stock for pet ${item.item}`)
                }
            }
        }

        
        for (const item of items){
            if(item.itemType === "Product" && item.variant){
                const product = productMap[item.item.toString()];
                const variant = product.variants.id(item.variant);

                variant.stock = variant.stock -  item.quantity;
                variant.sold = (variant.sold ?? 0) + item.quantity;
                saveTasks.push(product.save())

                item.price = variant.price;

                
            }
            if(item.itemType === "Pet"){
                const pet = petsMap[item.item.toString()];
                pet.quantity = pet.quantity - item.quantity;
                pet.sold = (pet.sold ?? 0) + item.quantity;
                saveTasks.push(pet.save())
                item.price = pet.price;
            }
        }

        

        const totalPrice = items.reduce((total,item)=>{
            return total + item.price * item.quantity
        }, 0 );

        const newOrder = new Order({
            user:userId,
            items:items,
            totalPrice,
            shippingInfo,
            status:"Đang đợi xác nhận",
            orderAt:Date.now()
        })
        await newOrder.save();

        res.status(200).json({
            message: "Order created successfully",
            status: "Success",
            code: 200,
            order: newOrder
        });
    }
    catch(error){
        next(error);
    }
}
const getAllOrderUser = async(req,res,next) =>{
    try{
        const userId = req.user._id;
        
        if(!userId){
            res.status(404);
            throw Error('No user found')
        }

        const orders = await Order.find({ user: userId })
            .sort({ orderedAt: -1 })
            
        if(!orders){
            res.status(404);
            throw Error("User hasn't place any order")
        }
        res.status(200).json({
            message: "Get user's orders successfully",
            status: "Success",
            code: 200,
            orders
        });
    }
    catch(error){
        next(error)
    }
}

const getDetailOrder = async(req,res,next)=>{
    try{
        const {orderId} = req.query;
        
        if(!orderId){
            res.status(400);
            throw Error('OrderId is required');
        }

        const order = await Order.findOne({_id:orderId}).populate('items.item').populate('user');;

        if(!order){
            res.status(404);
            throw Error('No order found');
        }

        res.status(200).json({
            message:"Get detail order successfully",
            status:"Success",
            code:200,
            order
        })

    }
    catch(error){
        next(error)
    }

}
module.exports = {createOrder,getAllOrderUser,getDetailOrder};