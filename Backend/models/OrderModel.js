const mongoose = require("mongoose");
const OrderItemSchema = new mongoose.Schema({
        itemType:{
                type:String,
                enum:['Product','Pet'],
                required:true
        },
        item:{
            type:mongoose.Schema.Types.ObjectId,
            refPath:"itemType",
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            min:1
        },
        variant:{
            type:mongoose.Schema.Types.ObjectId
        },
        price:{
            type:Number,
            required:true
        }
    
})

const OrderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[OrderItemSchema],
    totalPrice:{
        type:Number,
        required:true,
        default:0,
        min:0
    },
    
    shippingInfo:
        {
            fullname: {type:String,required:true},
            phoneNumber: {type:String,required:true},
            address: {type:String,required:true},
            cityProvince: {type:String,required:true},
            district: {type:String,required:true},
            ward: {type:String,required:true}
        }
    ,
    status:{
        type:String,
        enum:[
            "Đang đợi xác nhận",
            "Xác nhận",
            "Đã giao cho đơn vị vận chuyển",
            "Đang vận chuyển",
            "Giao hàng thất bại",
            "Giao hàng thành công"
        ],
        default:"Đang đợi xác nhận",
        required:true,
    },
    orderedAt:{
        type:Date,
        default:Date.now,
    }
})

module.exports = mongoose.model("Order",OrderSchema)