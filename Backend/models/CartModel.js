const mongoose = require("mongoose")

const CartItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        require:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    variant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product.variants",
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

const CartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[CartItemSchema],
    totalAmount:{
        type:Number,
        required:true,
        min:0
    }
},{timestamps:true})

module.exports = mongoose.model("Cart",CartSchema)