const Product = require("../../models/ProductModel")
const AddToCart = async (req,res,next) =>{

    try{
        // const product = new Product({
        //     name: "Khúc xương nhựa cao su dẻo cao cấp",
        //     sku: "KXND001",
        //     description: "Khúc xương nhựa cao su dẻo cao cấp...",
        //     status: "Có sẵn",
        //     variants: [
        //         { color: "Xanh dương", price: 40000, stock: 50, sold: 200 },
        //         { color: "Hồng", price: 40000, stock: 50, sold: 200 },
        //         { color: "Xanh lá", price: 40000, stock: 50, sold: 200 }
        //     ],
        //     image: ["https://res.cloudinary.com/..."],
        //     species: ["Chó", "Mèo"],
        //     features: ["Chất liệu..."]
        // });
        
        // product.save().then(doc => {
        //     console.log(doc);  // Kiểm tra xem _id đã được sinh ra trong variants chưa
        // });
    }
    catch(error){
        next(error)
    }
}

const GetCart = async(req,res,next)=>{
    try{
        
    }
    catch(error){
        next(error)
    }
}

const GetDetailCart = async(req,res,next)=>{

    try{

    }
    catch(error){
        next(error)
    }
}

module.exports = {AddToCart,GetCart,GetDetailCart}