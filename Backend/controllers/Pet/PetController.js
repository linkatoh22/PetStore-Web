const Pet = require("../../models/PetModel")


const fetchPetSoldDesc = async (req,res,next)=>{

    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("fetchPetSoldDesc: ", fullUrl);


        const pets = await Pet.find().sort({sold:-1}).limit(8);
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
        const {search,breed,age,color,maxPrice,minPrice,gender,sort,page,limit} = req.query;
        const skip = (page-1)*limit;
        var totalRecords= 0;

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
        
        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Successfully query Pet",
            page:page,
            amount:limit,
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
        const species = req.query.species ||'Chó';
        const skip = (page-1)*limit;
        
        if(keyword){
            query.$text = {$search:keyword};
        }
        if(species){
            query.species = species
        }

        const totalRecords = await Pet.find(query).countDocuments();
        
        if(sort == 0||!sort)
        {
            pets = await Pet.find(query).skip(skip).limit(limit);
        }
        else if (sort == 1){
            pets = await Pet.find(query).skip(skip).limit(limit).sort({sold:-1});
        }
        else if (sort == 2){
            pets = await Pet.find(query).skip(skip).limit(limit).sort({sold:1});
        }
        else if (sort == 3){
            pets = await Pet.find(query).skip(skip).limit(limit).sort({price:-1});
        }
        else if (sort == 4){
            pets = await Pet.find(query).skip(skip).limit(limit).sort({price:1});
        }
        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Successfully Search Pet",
            page:page,
            amount:limit,
            totalItems:totalRecords,
            pets
        })

    }
    catch(error){
        
        next(error);
    }
}

module.exports = {fetchPetSoldDesc,PetQuery,SearchPet}