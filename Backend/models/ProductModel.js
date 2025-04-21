const mongoose = require("mongoose")

const variantsSchema = new mongoose.Schema({
    weight: String,
    color:String,
    size:String,

    price:Number,
    stock:Number,
    sold:Number

},{_id:false})

const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please add the Product's name"]
    },
    brand:{
        type:String,
        require:[true,"Please add the Product's brand"]
    },
    sku:{
        type:String,
        require:[true,"Please add the Product's sku"]
    },
    description:{
        type:String,
        require:[true,"Please add the Product's description"]
    },
    status:{
        type:String,
        enum:["Có sẵn","Hết Hàng"],
        required: [true,"Please add the Product's status"]
    },
    variants:[variantsSchema],
    image:{
        type: [String]
    },
    species:{
        type:String,
        enum:["Chó","Mèo"],
        require:[true,"Please add the Product's species"]
    },
    features:{
        type:[String]
    },
    ingredients:{
        type:[String]
    },
    category:{
        type:String,
        enum:[
            "Đồ dùng & đồ chơi & phụ kiện",
            "Vệ sinh & Chăm sóc",
            "Thuốc và thực phẩm chức năng",
            "Thức ăn và thực phẩm dinh dưỡng",
            "Chuồng, nhà , balo, quây, đệm"
        ]
    },
    subcategory:{
        type:String,
        enum:[
            "Bình nước& Bát ăn & Lược Chải"
            ,"Quần áo"
            ,"Vòng cổ & Dây Dắt & Phụ Kiện"
            ,"Đồ chơi"
            ,"Cát vệ sinh cho mèo"
            ,"Sữa Tắm & Khăn Tắm & Nước Hoa"
            ,"Thực Phẩm Chức Năng"
            ,"Thuốc Thú Y và thiết bị y Tế"
            ,"Thức ăn Hạt"
            ,"Pate - Nước Sốt"
            ,"Bánh thưởng & Xương Gặm"
            ,"Balo & Túi Vận Chuyển"
            ,"Chuồng & Nhà & Chậu Cát"
            ,"Đệm & Nệm - Ổ nằm"
        ]
    }
},{timepstamps:true})

module.exports = mongoose.model("Product",ProductSchema);