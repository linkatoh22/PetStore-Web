const Product = require("../../models/ProductModel")

const ProductTopSold = async (req,res,next) =>{
    try{
        const products = await Product.aggregate(
            [
                {
                    $addFields:{
                        totalSold:{
                            $sum:"$variants.sold"
                        },
                        minPrice:{
                            $min:"$variants.price"
                        },
                        maxPrice:{
                            $max:"$variants.price"
                        }
                    }
                },
                {

                    $sort:{
                        totalSold:-1
                    }
                },
                {
                    $limit:8
                }
            ]
        )
        return res.status(200).json(products);
    }
    catch(error){
        next(error);
    }

}
const ProductQuery = async (req,res,next) =>{
    let filter = {};
    let products = [];
    const {subcategory,category,sort} = req.query;
    if(subcategory)
        filter.subcategory = category;
    if(category)
        filter.category = category;
    
    if(sort==0||!sort)
        products = await Product.find(filter);
    else if(sort == 1){
        products = await Product.aggregate(
            [
                {
                    $addFields:{
                        totalSold:{
                            $sum:"$variants.sold"
                        }
                    }
                },
                {

                    $sort:{
                        totalSold:-1
                    }
                }
            ]
        )
    }
    else if(sort==2){
        products = await Product.aggregate(
            [
                {
                    $addFields:{
                        totalSold:{
                            $sum:"$variants.sold"
                        }
                    }
                },
                {

                    $sort:{
                        totalSold:1
                    }
                }
            ]
        )
    }
    else if(sort==3){
        products = await Product.aggregate([
            {
                $addFields:{
                    minPrice:{
                        $min:"$variants.price"
                    }
                }
            },
            {
                $sort:{
                    minPrice:-1
                }
            }
        ])
    }
    else if (sort==4){
        products = await Product.aggregate([
            {
                $addFields:{
                    minPrice:{
                        $min:"$variants.price"
                    }
                }
            },
            {
                $sort:{
                    minPrice:-1
                }
            }
        ])
        
    }

}
module.exports = {ProductTopSold}