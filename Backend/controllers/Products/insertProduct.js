// const Product = require("../../models/ProductModel")

// const CatBowl = require("../../PRODUCT/Accessories/Cat/Bowl.json")
// const CatClothes = require("../../PRODUCT/Accessories/Cat/clothe.json")
// const CatCollar = require("../../PRODUCT/Accessories/Cat/Collar.json")
// const CatToys = require("../../PRODUCT/Accessories/Cat/Toys.json")

// const DogBowl = require("../../PRODUCT/Accessories/Dog/Bowl.json")
// const DogClothes = require("../../PRODUCT/Accessories/Dog/Clothes.json")
// const DogCollar = require("../../PRODUCT/Accessories/Dog/Collar.json")
// const DogToys = require("../../PRODUCT/Accessories/Dog/Toys.json")

// const careCat = require("../../PRODUCT/Care/Cat/careCat.json");
// const HygineCat = require("../../PRODUCT/Care/Cat/HygineCat.json");

// const careDog = require("../../PRODUCT/Care/Dog/careDog.json");
// const HygineDog = require("../../PRODUCT/Care/Dog/HygineDog.json");

// const FunctionFoodCat = require("../../PRODUCT/Drug/Cat/FunctionFoodCat.json")
// const MedCat = require("../../PRODUCT/Drug/Cat/MedCat.json")

// const FunctionFoodDog = require("../../PRODUCT/Drug/Dog/FunctionalFoodDog.json")
// const MedDog = require("../../PRODUCT/Drug/Dog/MedDog.json")

// const HatCat = require("../../PRODUCT/Food/Cat/HatCat.json")
// const Pate= require("../../PRODUCT/Food/Cat/Pate.json")
// const ThuongCat = require("../../PRODUCT/Food/Cat/ThuongCat.json")

// const HatDog = require("../../PRODUCT/Food/Dog/HatDog.json");
// const PateDog = require("../../PRODUCT/Food/Dog/PateDog.json");
// const SuaDog = require("../../PRODUCT/Food/Dog/SuaDog.json");
// const ThuongDog = require("../../PRODUCT/Food/Dog/ThuongDog.json");

// const BaloCat = require("../../PRODUCT/House/Cat/Balo.json")
// const CageCat = require("../../PRODUCT/House/Cat/Cage.json")
// const MatressCat = require("../../PRODUCT/House/Cat/Matress.json")

// const BaloDog = require("../../PRODUCT/House/Dog/Balo.json")
// const CageDog = require("../../PRODUCT/House/Dog/Cage.json")
// const MatressDog = require("../../PRODUCT/House/Dog/Matress.json")

// const Data = [CatBowl,CatClothes,CatCollar,CatToys,DogBowl,DogClothes,DogCollar,DogToys,careCat,HygineCat,careDog,HygineDog,FunctionFoodCat,MedCat,FunctionFoodDog,MedDog,HatCat,Pate,ThuongCat,HatDog,PateDog,SuaDog,ThuongDog,BaloCat,CageCat,MatressCat,BaloDog,CageDog,MatressDog]
// const InsertData = async (req,res,next) =>{
//     try{
//         const InsertFile = async (file)=>{
//             await Product.insertMany(file);
//         }
//         Data.map((index)=>{
//             InsertFile(index);
//         })
        
//         res.status(200).json({Message:"Successs"})
//     }
//     catch(error){
//         next(error);
//     }
// }

// module.exports = {InsertData}