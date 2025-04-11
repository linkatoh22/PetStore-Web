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
        var pets;
        const {search,breed,age,color,maxPrice,minPrice,gender,sort} = req.query;
        let filter = {};
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
        if(sort == 0||!sort){
            
            pets = await Pet.find(filter);
        }
        else if (sort==1){
            
            pets = await Pet.find(filter).sort({sold:-1});
        }
        else if (sort == 2){
            pets = await Pet.find(filter).sort({sold:1});
        }
        else if (sort == 3){
            pets = await Pet.find(filter).sort({price:-1});
        }
        else if (sort ==4){
            pets = await Pet.find(filter).sort({price:1});
        }
        
        res.status(200).json(pets)

    }

    catch(error)
    {
        next(error);
        
    }


}
module.exports = {fetchPetSoldDesc,PetQuery}