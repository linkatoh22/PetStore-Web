const Pet = require("../../models/PetModel")


const fetchPetSoldDesc = async (req,res,next)=>{

    try{
        const pets = await Pet.find().sort({sold:-1}).limit(8);
        // console.log(pets);
        return res.status(200).json(pets);  
    }
    catch(error){

        next(error)
    }

}

const PetQuery = async (req,res,next) =>{
    try{
        console.log("HEYYY IM HERE")
        const {search,breed,age,color,maxPrice,minPrice,gender} = req.query;
        let filter = {};
        if(breed)
            filter.breed = breed;
        if (age)
            filter.age = age;
        if (color)
            filter.color = color;
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

        const pets = await Pet.find(filter).sort({sold:-1});
        // console.log(pets)
        res.status(200).json(pets)

    }

    catch(error)
    {
        next(error);
        
    }


}
module.exports = {fetchPetSoldDesc,PetQuery}