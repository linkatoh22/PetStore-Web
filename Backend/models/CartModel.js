const mongoose = require("mongoose")

const CartItemSchema = new mongoose.Schema({
    itemType:{
        type:String,
        enum:['Product','Pet'],
        required:true
    },
    item:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:function(){
            return this.itemType;
        },
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    variant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product.variants"
    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["Đủ hàng","Không đủ hàng","Hết hàng","Ngừng kinh doanh"],
        required:true
    }
}, { timestamps: true })

const CartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[CartItemSchema],
    totalPrice:{
        type:Number,
        required:true,
        default:0,
        min:0
    }
},{timestamps:true})

module.exports = mongoose.model("Cart",CartSchema)