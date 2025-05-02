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
                        },
                        totalStock:{
                            $sum:"$variants.stock"
                        }
                    }
                },
                {
                    $match: {
                        totalStock: { $gt: 0 }
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
        console.log("HERE")
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
            // { 
            //     $addFields:{  
            //         totalSold:{ $sum:"$variants.sold"},
            //         totalStock:{ $sum:"$variants.stock" }
            //     }
            // },
                {   $sort:{     totalSold:-1    }}
                ,
                { $match: { totalStock: { $gt: 0 } } }
            )

            
        }
        else if(sort==2){
            pipeline.push(
                // { 
                //     $addFields:{  
                //         totalSold:{ $sum:"$variants.sold"},
                //         totalStock:{ $sum:"$variants.stock" }
                //     }
                // },
                {   $sort:{     totalSold:1    }}
                ,
                {   $match: { totalStock: { $gt: 0 }  } }
            )

            
        }
        else if(sort==3){

            pipeline.push(
                // {   
                //     $addFields:
                //     {    
                //         minPrice:{  $min:"$variants.price"  },
                //         totalStock:{ $sum:"$variants.stock" }  
                //     }   
                // },
                {   $sort:{ minPrice:-1 } }
                ,
                {   $match: { totalStock: { $gt: 0 }  } }
            )

            
        }
        else if (sort==4){

            pipeline.push(
                // {   
                //     $addFields:
                //         {    
                //             minPrice:{  $min:"$variants.price"  },
                //             totalStock:{ $sum:"$variants.stock" } 
                //         } 
                // },
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
                totalStock: { $sum: "$variants.stock" }
            }
        });

        // Filter products with stock > 0
        pipeline.push({
            $match: {
                totalStock: { $gt: 0 }
            }
        });

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
        const totalPage = Math.ceil(totalRecords / limit);

        
        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Successfully Searching Product",
            page,
            amount: limit,
            totalRecords: totalRecords,
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
        const query={};

        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const keyword = req.query.keyword || '';
        const sort = parseInt(req.query.sort);
        const skip = (page - 1) * limit;

        query.quantity = { $gt: 0 };
        query.$text = {$search:keyword};

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
        const petsDocs = await Product.find(query);
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
        const totalPage = Math.ceil(results.length / limit);
        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Successfully Searching All",
            page:page,
            amount:limit,
            totalRecords:results.length,
            totalPage,
            results:paginatedResults
        })
    } 
    catch(error){
        console.error("Error in SearchAll:", error);
        next(error)
    }

}
module.exports = {ProductTopSold,ProductQuery,ProductSearch,SearchAll}