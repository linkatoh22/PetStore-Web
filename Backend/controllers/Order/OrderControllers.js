const Order = require("../../models/OrderModel");
const Product = require("../../models/ProductModel");
const Pet = require("../../models/PetModel");
const Cart = require("../../models/CartModel")
const mongoose  = require("mongoose");

const createOrder = async(req,res,next) =>{
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("createOrder: ", fullUrl);

    const session = await mongoose.startSession();
    session.startTransaction();
    
    try{
        
        const userId = req.user._id;
        const {items,shippingInfo} = req.body;
        
        // Kiểm tra nếu không có item nào trong đơn hàng
        if(!items || items.length === 0){
            res.status(400);
            throw new Error("Order must contain at least one item")
        }

         // Kiểm tra nếu không có thông tin giao hàng
        if(!shippingInfo) {
            res.status(400);
            throw Error("Shipping info is required")
        }
        
        

        // Lấy danh sách ID của tất cả item trong đơn hàng
        const productIds = items.map(item=>item.item); 


        // Tìm tất cả sản phẩm có trong danh sách item
        const products = await Product.find({_id:{$in:productIds}}).session(session);

        // Tìm tất cả thú cưng có trong danh sách item
        const pets = await Pet.find({_id:{$in:productIds}}).session(session);



        const productMap = {}; // Map để tra cứu nhanh sản phẩm theo ID
        products.forEach(product=>{
            productMap[product._id.toString()] = product;
        })

        
        const petsMap = {}; // Map để tra cứu nhanh thú cưng theo ID
        pets.forEach( pet=>{
            petsMap[pet._id.toString()] = pet;
        })

        const modifiedProducts = new Map(); // key: productId, value: product
        const modifiedPets = new Map();     // key: petId, value: pet
        
        // KIỂM TRA TỒN KHO, CẬP NHẬT TỒN KHO VÀ TÍNH GIÁ
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

                if(variant.stock < item.quantity){
                    res.status(400);
                    throw new Error(`Not enough stock for variant of product ${item.item}`)
                }
                
                variant.stock = variant.stock -  item.quantity;
                variant.sold = (variant.sold ?? 0) + item.quantity;
                item.price = variant.price;

                modifiedProducts.set(product._id.toString(), product);

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

                pet.quantity = pet.quantity - item.quantity;
                pet.sold = (pet.sold ?? 0) + item.quantity;

                item.price = pet.price;
                 modifiedPets.set(pet._id.toString(), pet);
                
            }
        }



        
        // TÍNH TỔNG GIÁ ĐƠN HÀNG
       
        const originalPrice = items.reduce((total,item)=>{
            return total + item.price * item.quantity
        }, 0 );
        const shippingFee = originalPrice>300000? 0 :30000;
         const totalPrice = originalPrice + shippingFee;
        //CART
        const cart = await Cart.findOne({ user: userId }).session(session);

        if (cart) {
           cart.items = cart.items.filter(cartItem => {
            return !items.some(orderItem => {
                const sameType = cartItem.itemType === orderItem.itemType;
                const sameItem = cartItem.item.toString() === orderItem.item.toString();
                const sameVariant = (cartItem.variant?.toString() || '') === (orderItem.variant?.toString() || '');
                return sameType && sameItem && sameVariant;
            });
            });

            cart.totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
            await cart.save({ session });
        }


        // TẠO ĐƠN HÀNG MỚI
        const newOrder = new Order({
            user:userId,
            items:items,
            totalPrice,
            originalPrice,
            shippingFee,
            shippingInfo,
            status:"Đang đợi xác nhận",
            orderAt:Date.now(),
            statusHistory:[{
                status:"Đang đợi xác nhận",
                updatedAt: new Date()
            }]
        })
        
        
        // Lưu đơn hàng vào MongoDB
        const saveTasks = [
            ...Array.from(modifiedProducts.values()).map(product => product.save({ session })),
            ...Array.from(modifiedPets.values()).map(pet => pet.save({ session })),
        ];
        await Promise.all(saveTasks);

        await newOrder.save({ session }); // Lưu order trong transaction

        await session.commitTransaction(); // Xác nhận thành công
        session.endSession(); // Kết thúc session



         // Trả kết quả về client
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

        const infoOrders = JSON.parse(JSON.stringify(orders));
        

        await Promise.all(
            infoOrders.map(async (order) => {
                await Promise.all(
                    order.items.map(async (item, index) => {
                        if (item.itemType === "Product") {
                            const product = await Product.findById(item.item);
                            const infoProduct = JSON.parse(JSON.stringify(product));
                            infoProduct.variants = infoProduct.variants.filter(
                                (vr) => vr._id == item.variant
                            );
                            order.items[index].productItem = infoProduct;
                        } else if (item.itemType === "Pet") {
                            const pet = await Pet.findById(item.item);
                            order.items[index].productItem = pet;
                        }
                    })
                );
            })
        );

        res.status(200).json({
            message: "Get user's orders successfully",
            status: "Success",
            code: 200,
            infoOrders
        });
    }
    catch(error){
        next(error)
    }
}

const getDetailOrder = async(req,res,next)=>{
    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("getDetailOrder: ", fullUrl);
        const {orderId} = req.query;
        
        if(!orderId){
            res.status(400);
            throw Error('OrderId is required');
        }

        const order = await Order.findOne({_id:orderId});
        if(!order){
            res.status(404);
            throw Error('No order found');
        }
        const infoOrders = JSON.parse(JSON.stringify(order));
        
        await Promise.all(
            infoOrders.items.map(async (item, index) => {
                
                if (item.itemType === "Product") {
                    const product = await Product.findById(item.item);
                    const infoProduct = JSON.parse(JSON.stringify(product));
                    infoProduct.variants = infoProduct.variants.filter(
                        (vr) => vr._id == item.variant
                    );
                    
                    infoOrders.items[index].productItem = infoProduct;
                } else if (item.itemType === "Pet") {
                    const pet = await Pet.findById(item.item);
                    infoOrders.items[index].productItem = pet;
                    
                }
            })
        );
            
        

        

        res.status(200).json({
            message:"Get detail order successfully",
            status:"Success",
            code:200,
            infoOrders
        })

    }
    catch(error){
        next(error)
    }

}

const updateOrderStatus =async  (req,res,next)=>{
    try{
        const {orderId} = req.params;
        const {status} = req.body;

        if(!orderId || !status){
            res.status(400)
            throw Error("Vui lòng truyền đủ các trường để chỉnh sửa")
        }
        
        
        if(status === "Đang đợi xác nhận" || status=== "Xác nhận"|| status==="Đã hủy"|| status==="Đang vận chuyển"|| status==="Giao hàng thất bại"|| status==="Giao hàng thành công"){

                const order  = await Order.findByIdAndUpdate(
                    orderId,
                    {status:status}
                )

                return res.status(200).json({
                    message:"Updated Order Successfully",
                    status:"Successfully",
                    code:200,
                    order
                })

        }
        else{
            res.status(404)
             throw Error("Vui lòng chọn đúng dạng enum status")
        }
        


    }
    catch(error){
        next(error)
    }
}
module.exports = {createOrder,getAllOrderUser,getDetailOrder,updateOrderStatus};