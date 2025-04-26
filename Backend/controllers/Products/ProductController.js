const Product = require("../../models/ProductModel")

const ProductTopSold = async (req,res,next) =>{
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("ProductTopSold: ", fullUrl);
        
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
        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Successfully query Product most sold",
            products
        
        });
    }
    catch(error){
        next(error);
    }

}
const ProductQuery = async (req,res,next) =>{
    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("ProductQuery: ", fullUrl);

        let filter = {};
        let products = [];
        const {subcategory,category,sort,page,limit} = req.query;
        const skip = (page-1)*limit;
        var totalRecords = 0;
        
        if(subcategory) filter.subcategory = subcategory;
        if(category) filter.category = category;

        totalRecords = await Product.find(filter).countDocuments();
        
        if(sort==0||!sort)
            products = await Product.find(filter).skip(skip).limit(limit);
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
                    },
                    {
                        $skip:skip
                    },
                    {
                        $limit:limit
                    }
                ]
            )
        }
        else if(sort==2){
            products = await Product.aggregate(
                [
                    { $match: filter },
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
                    },
                    {
                        $skip:skip
                    },
                    {
                        $limit:limit
                    }
                ]
            )
        }
        else if(sort==3){
            products = await Product.aggregate([
                { $match: filter },
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
                },
                {
                    $skip:skip
                },
                {
                    $limit:limit
                }
            ])
        }
        else if (sort==4){
            products = await Product.aggregate([
                { $match: filter },
                {
                    $addFields:{
                        minPrice:{$min:"$variants.price"}
                    }
                },
                {
                    $sort:{
                        minPrice:1
                    }
                },
                {
                    $skip:skip
                },
                {
                    $limit:limit
                }
            ])
            
        }

    return res.status(200).json({
        status:"Success",
        code:200,
        message:"Successfully query Product",
        page:page,
        amount:limit,
        totalItems:totalRecords,
        products});
    }
    catch(error){
        next(error);
    }

}

const ProductSearch = async (req, res, next) => {
    try {
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("ProductSearch: ", fullUrl);


        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const keyword = req.query.keyword || '';
        const sort = parseInt(req.query.sort);
        var products;
        const skip = (page - 1) * limit;
        const pipeline = [
            {
                $match: {
                    $text: { $search: keyword }
                }
            }
        ];

        if (sort === 1) {
            pipeline.push(
                { $addFields: { totalSold: { $sum: "$variants.sold" } } },
                { $sort: { totalSold: 1 } }
            );
        } else if (sort === 2) {
            pipeline.push(
                { $addFields: { totalSold: { $sum: "$variants.sold" } } },
                { $sort: { totalSold: -1 } }
            );
        } else if (sort === 3) {
            pipeline.push(
                { $addFields: { minPrice: { $min: "$variants.price" } } },
                { $sort: { minPrice: 1 } }
            );
        } else if (sort === 4) {
            pipeline.push(
                { $addFields: { minPrice: { $min: "$variants.price" } } },
                { $sort: { minPrice: -1 } }
            );
        }
        products = await Product.aggregate(pipeline);
        totalRecords= products.length;
        pipeline.push({ $skip: skip }, { $limit: limit });
        products = await Product.aggregate(pipeline);
        

        
        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Successfully Searching Product",
            page,
            amount: limit,
            totalRecords: totalRecords,
            products
        });

    } catch (error) {
        console.error("Error in ProductSearch:", error);
        next(error);
    }
};


const SearchAll = async (req,res,next) =>{
    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("SearchAll: ", fullUrl);


        console.log("HERE")
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const keyword = req.query.keyword || '';
        const sort = parseInt(req.query.sort);
        const skip = (page - 1) * limit;

        const pipeline = [
            {
                $match:{    $text:{$search:keyword} }
            },
            {   
                $addFields:
                {
                    minPrice:{  $min:"$variants.price" },
                    totalSold:{     $sum:"$variants.sold"   }
                }
            
            }
         ];

        //Tìm Product
        const productsDocs = await Product.aggregate(pipeline);
        const products = productsDocs.map((p)=>({
            
                id:p._id,
                name:p.name,
                brand:p.brand,
                price:p.minPrice,
                sold:p.totalSold,
                image:p.image,
                type:"Product"
        }))

        //Tìm Pet
        const petsDocs = await Product.find({   $text : {$search:keyword}   })
        const pets = petsDocs.map((p)=>({
            id:p._id,
            name:p.name,
            gender:p.gender,
            age:p.age,
            price:p.price,
            image:p.image,
            type:"Pet"
        }))

        let results = [...products,...pets]
        
        if(sort === 1){
            results.sort((a,b)=>b.sold - a.sold)
        }
        else if(sort === 2 ){
            results.sort((a,b)=>a.sold-b.sold);
        }
        else if(sort === 3){
            results.sort((a,b)=>a.price-b.price)
        }
        else if(sort === 4 ){
            results.sort((a,b)=>b.price-a.price)
        }

        const paginatedResults = results.slice(skip, skip + limit);

        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Successfully Searching All",
            page:page,
            amount:limit,
            totalRecords:results.length,
            results:paginatedResults
        })
    } 
    catch(error){
        console.error("Error in SearchAll:", error);
        next(error)
    }

}
module.exports = {ProductTopSold,ProductQuery,ProductSearch,SearchAll}