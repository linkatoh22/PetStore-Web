const Product = require("../../models/ProductModel")
const Pet =require("../../models/PetModel")
const mongoose =require("mongoose")
const getDetailProduct = async (req,res,next)=>{
    try{
        
        const {id} = req.query;
        const productId = new mongoose.Types.ObjectId(id);
        const ProductDetail = await Product.aggregate(
            [
                {   $match: {   _id : productId }  },
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
                        },
                        totalStock:{
                            $sum:"$variants.stock"
                        }
                    }
                }
            ]
        );
        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Successfully query Detail Product",
            ProductDetail:ProductDetail[0]});
    }
    catch(error){
         next(error)
    }
}
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
                        },
                        totalStock:{
                            $sum:"$variants.stock"
                        }
                    }
                },
                {
                    $match: {
                        totalStock: { $gt: 0 },
                        status:{$nin: ["Hết hàng", "Ngừng kinh doanh"]}
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
        const {subcategory,category,species} = req.query;

        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = parseInt(req.query.sort);
        const skip = (page-1)*limit;
        
        var totalRecords = 0;
        

        if(subcategory) filter.subcategory = subcategory;
        if(category) filter.category = category;
        if(species) filter.species = species;

        filter.status = {$nin: ["Hết hàng", "Ngừng kinh doanh"]};

        totalRecords = await Product.find(filter).countDocuments();
        
        const pipeline = [{ $match: filter }]
       
        pipeline.push({   
            $addFields:
            {    
                minPrice:{  $min:"$variants.price"  },
                totalSold:{ $sum:"$variants.sold"},
                totalStock:{ $sum:"$variants.stock" }  
            }   
        })
        
        if(sort == 1){

            pipeline.push(
                {   $sort:{     totalSold:-1    }}
                ,
                { $match: { totalStock: { $gt: 0 } } }
            )

            
        }
        else if(sort==2){
            pipeline.push(
                {   $sort:{     totalSold:1    }}
                ,
                {   $match: { totalStock: { $gt: 0 }  } }
            )

            
        }
        else if(sort==3){

            pipeline.push(
                {   $sort:{ minPrice:-1 } }
                ,
                {   $match: { totalStock: { $gt: 0 }  } }
            )

            
        }
        else if (sort==4){

            pipeline.push(
                {   
                    $sort:{ minPrice:1 } 
                },
                {   $match: { totalStock: { $gt: 0 }  } }
            )

            
        }


        pipeline.push(  
            { $skip:skip    },
            {   $limit:limit    }
        )
        products = await Product.aggregate(pipeline);
        const totalPage = Math.ceil(totalRecords / limit);
    return res.status(200).json({
        status:"Success",
        code:200,
        message:"Successfully query Product",
        page:page,
        amount:limit,
        totalItems:totalRecords,
        totalPage:totalPage,
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

        pipeline.push({
            $addFields: {
                totalStock: { $sum: "$variants.stock" },
                totalSold: { $sum: "$variants.sold" },
                minPrice: { $min: "$variants.price" }
            }
        });

        // Filter products with stock > 0
        pipeline.push({
            $match: {
                totalStock: { $gt: 0 },
                status: { $nin: ["Hết hàng", "Ngừng kinh doanh"] }  
            }
        });

        if (sort === 1) {
            pipeline.push(
                { $sort: { totalSold: 1 } }
            );
        } else if (sort === 2) {
            pipeline.push(
                { $sort: { totalSold: -1 } }
            );
        } else if (sort === 3) {
            pipeline.push(
                { $sort: { minPrice: -1 } }
            );
        } else if (sort === 4) {
            pipeline.push(
                { $sort: { minPrice: 1 } }
            );
        }
        products = await Product.aggregate(pipeline);
        totalRecords= products.length;
        pipeline.push({ $skip: skip }, { $limit: limit });
        products = await Product.aggregate(pipeline);
        const totalPage = Math.ceil(totalRecords / limit);

        
        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Successfully Searching Product",
            page,
            amount: limit,
            totalItems: totalRecords,
            totalPage,
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
        
         pipeline.push({
            $addFields: {
                totalStock: { $sum: "$variants.stock" }
            }
        });

        // Filter products with stock > 0
        pipeline.push({
            $match: {
                totalStock: { $gt: 0 }
            }
        });
        
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
        const query={};
        query.quantity = { $gt: 0 };
        query.status = {$nin: ["Hết hàng", "Ngừng kinh doanh"]};
        query.$text = {$search:keyword};


        const petsDocs = await Pet.find(query).sort({ score: { $meta: "textScore" } })
        const pets = petsDocs.map((p)=>({
            _id:p._id,
            name:p.name,
            gender:p.gender,
            age:p.age,
            price:p.price,
            image:p.image,
            sold:p.sold??0,
            price:p.price,
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
            results.sort((a,b)=>b.price-a.price)
            
        }
        else if(sort === 4 ){
            results.sort((a,b)=>a.price-b.price)
        }

        const paginatedResults = results.slice(skip, skip + limit);
        const totalPage = Math.ceil(results.length / limit);
        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Successfully Searching All",
            page:page,
            amount:limit,
            totalItems:results.length,
            totalPage,
            results:paginatedResults
        })
    } 
    catch(error){
        console.error("Error in SearchAll:", error);
        next(error)
    }

}

const RecommendProduct = async (req,res,next)=>{
    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("ProductQuery: ", fullUrl);

        let filter = {};
        let products = [];
        const {category,id} = req.query;
        
        if(category) filter.category = category;

        filter.status = {$nin: ["Hết hàng", "Ngừng kinh doanh"]};
        filter._id = {$nin:[id]}
        
        const pipeline = [{ $match: filter }]

        pipeline.push({   
            $addFields:
            {    
                minPrice:{  $min:"$variants.price"  },
                totalSold:{ $sum:"$variants.sold"},
                totalStock:{ $sum:"$variants.stock" }  
            }   
        })
        pipeline.push(
                {   $sort:{     totalSold:-1    }}
                ,
                { $match: { totalStock: { $gt: 0 } } }
        )
        pipeline.push(  
            {   $limit:12    }
        )
            
        products = await Product.aggregate(pipeline);
        
    return res.status(200).json({
        status:"Success",
        code:200,
        message:"Successfully Recommend Product",
        products});

        

    }
    catch(error){

        next(error);
    }
}
module.exports = {ProductTopSold,ProductQuery,ProductSearch,SearchAll,getDetailProduct,RecommendProduct}