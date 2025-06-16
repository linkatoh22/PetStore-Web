const mongoose = require("mongoose")

const variantsSchema = new mongoose.Schema({
    weight: String,
    color: String,
    size: String,
    price: Number,
    stock: Number,
    sold: Number
}, { _id: true })

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
        default:"Có sẵn",
        enum:["Có sẵn","Hết hàng","Ngừng kinh doanh"],
        required: [true,"Please add the Product's status"]
    },
    variants:[variantsSchema],
    image:{
        type: [String]
    },
    species:{
        type:[String],
        // enum:["Chó","Mèo"],
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
            "Đồ dùng & Đồ chơi & Phụ kiện",
            "Vệ sinh & Chăm sóc",
            "Thuốc & Thực phẩm chức năng",
            "Thức ăn & Thực phẩm dinh dưỡng",
            "Chuồng & Nhà & Balo & Quây & Đệm"
        ]
    },
    subcategory:{
        type:String,
        enum:[
            "Bình nước & Bát ăn & Lược Chải"
            ,"Quần áo"
            ,"Vòng cổ & Dây Dắt & Phụ Kiện"
            ,"Vòng cổ & Dây Dắt & Rọ mỏm"
            ,"Đồ chơi"
            ,"Cát vệ sinh cho mèo"
            ,"Sữa Tắm & Khăn Tắm & Nước Hoa"
            ,"Thực Phẩm Chức Năng"
            ,"Thuốc Thú Y & Thiết bị y Tế"
            ,"Thức ăn Hạt"
            ,"Sữa Cho Bé Lớn Và Nhỏ"
            ,"Pate & Nước Sốt"
            ,"Bánh thưởng & Xương Gặm"
            ,"Balo & Túi Vận Chuyển"
            ,"Chuồng & Nhà & Chậu Cát"
            ,"Đệm & Nệm & Ổ nằm"
        ]
    }
},{timepstamps:true})

ProductSchema.index(
    { name: 'text', category:'text',subcategory:'text',description: 'text', brand: 'text',weight:'text',color:'text',size:'text' },
    { weights: { name: 10,subcategory:9,category:8, description: 2, brand: 7,weight:1,color:1,size:1 } }
  );

module.exports = mongoose.model("Product",ProductSchema);