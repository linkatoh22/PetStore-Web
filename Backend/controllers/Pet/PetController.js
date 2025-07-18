const Pet = require("../../models/PetModel")

const getDetailPet = async (req,res,next)=>{
    try{
        const {id} = req.query;
        const PetDetail =  await Pet.findById(id)
        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Successfully query Pet most sold",
            PetDetail});  

    }
    catch(error){
        next(error)
    }
    
}
const fetchPetSoldDesc = async (req,res,next)=>{

    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("fetchPetSoldDesc: ", fullUrl);

        const query = { quantity: {$gt:0},                 // còn hàng (> 0)
        status: { $nin: ["Hết hàng", "Ngừng kinh doanh"] }  
        }; //status != "Hết hàng" && status !="Ngừng kinh doanh"

        const pets = await Pet.find(query).sort({sold:-1}).limit(8);
        // console.log(pets);
        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Successfully query Pet most sold",
            pets});  
    }
    catch(error){

        next(error)
    }

}

const PetQuery = async (req,res,next) =>{
    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("PetQuery: ", fullUrl);

        let filter = {};
        var pets=[];
        const {search,breed,age,color,maxPrice,minPrice,gender,sort,page,limit,species} = req.query;
        const skip = (page-1)*limit;
        var totalRecords= 0;
        
        filter.quantity = { $gt: 0 };
        filter.status = {$nin: ["Hết hàng", "Ngừng kinh doanh"]};
        if(species)
            filter.species = species;
        if(breed)
            filter.breed = breed;
        if (age)
            filter.age = age;
        if (color){
            const colorArray = Array.isArray(color) ?  color: color.split(",");
            filter.color = {$in: colorArray};
        }
        if(search)
            filter.name={$regex:search,$options:'i'}
        if(gender)
            filter.gender= gender;

        if(maxPrice||minPrice)
        {
            filter.price={}
            if(minPrice) filter.price.$gte=parseInt(minPrice)
            if(maxPrice) filter.price.$lte=parseInt(maxPrice)
        }

        totalRecords = await Pet.find(filter).countDocuments();
        if(sort == 0||!sort){
            
            pets = await Pet.find(filter).skip(skip).limit(limit);
            
        }
        else if (sort==1){
            
            pets = await Pet.find(filter).sort({sold:-1}).skip(skip).limit(limit);
        }
        else if (sort == 2){
            pets = await Pet.find(filter).sort({sold:1}).skip(skip).limit(limit);
        }
        else if (sort == 3){
            pets = await Pet.find(filter).sort({price:-1}).skip(skip).limit(limit);
        }
        else if (sort == 4){
            pets = await Pet.find(filter).sort({price:1}).skip(skip).limit(limit);
        }
        
        const totalPage = Math.ceil(totalRecords / limit);

        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Successfully query Pet",
            page:page,
            amount:limit,
            totalPage:totalPage,
            totalItems:totalRecords,pets})

    }

    catch(error)
    {
        console.error("Error in ProductSearch:", error);
        next(error);
        
    }
}


const SearchPet = async (req,res,next) =>{
    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("SearchPet: ", fullUrl);
        
        var query={}
        var pets=[]
        

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const keyword = req.query.keyword || '';
        const sort = parseInt(req.query.sort);
        const species = req.query.species ||'';
        const skip = (page-1)*limit;
        
        query.quantity = { $gt: 0 };
        query.status = {$nin: ["Hết hàng", "Ngừng kinh doanh"]};
        if(keyword){
            query.$text = { $search: keyword };
        }
        if(species){
            query.species = species
        }

        const totalRecords = await Pet.find(query).countDocuments();
        // const Petseee = await Pet.find(query);
        
        if(sort == 0||!sort)
        {
            pets = await Pet.find(query).skip(skip).limit(limit).sort({ score: { $meta: "textScore" } })
        }
        else if (sort == 1){
            pets = await Pet.find(query).skip(skip).limit(limit).sort({sold:-1},{ score: { $meta: "textScore" } });
        }
        else if (sort == 2){
            pets = await Pet.find(query).skip(skip).limit(limit).sort({sold:1},{ score: { $meta: "textScore" } });
        }
        else if (sort == 3){
            pets = await Pet.find(query).skip(skip).limit(limit).sort({price:-1},{ score: { $meta: "textScore" } });
        }
        else if (sort == 4){
            pets = await Pet.find(query).skip(skip).limit(limit).sort({price:1},{ score: { $meta: "textScore" } });
        }

        const totalPage = Math.ceil(totalRecords / limit);

        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Successfully Search Pet",
            page:page,
            amount:limit,
            totalItems:totalRecords,
            totalPage:totalPage,
            pets
        })

    }
    catch(error){
        
        next(error);
    }
}


const RecommendPet = async (req,res,next)=>{
    try{
         const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("PetRecommend: ", fullUrl);

        let filter = {};
        var pets=[];
        const {species,id} = req.query;
        
        filter.quantity = { $gt: 0 };
        filter.status = {$nin: ["Hết hàng", "Ngừng kinh doanh"]};
        filter._id = {$nin:[id]}


        if(species)
            filter.species = species;

        totalRecords = await Pet.find(filter).countDocuments();
        
        pets = await Pet.find(filter).sort({sold:-1}).limit(12);
        
    

        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Successfully query Pet",
            pets})
    }
    catch(error){
        next(error)
    }
}
module.exports = {fetchPetSoldDesc,PetQuery,SearchPet,getDetailPet,RecommendPet}