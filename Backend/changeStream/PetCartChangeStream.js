const mongoose = require("mongoose")
const Pet = require("../models/PetModel")
const Cart = require("../models/CartModel")

const UpdateStateCartByPetId = async(petId,status)=>{
    await Cart.updateMany(
        {
            "items.item":petId
        },
            {   $set:{"items.$[elem].status":status} }
        ,
        {
            arrayFilters:[
                {"elem.item":petId}
            ]
        }
    )
}

const IsStockDecrease= async (petId,stock)=>{
    await Cart.updateMany(
        {"items.item":petId},
        { $set:{"items.$[elem].status":"Không đủ hàng"} },
        { arrayFilters:
            [
                {
                    "elem.item":petId,
                    "elem.quantity": {$gt:stock}
                }
            ]
        }
    )
}

const IsStockIncrease= async (petId,stock)=>{
    await Cart.updateMany(
        {"items.item":petId},
        { $set:{"items.$[elem].status":"Đủ hàng"} },
        { arrayFilters:
            [
                {
                    "elem.item":petId,
                    "elem.quantity": {$lte:stock}
                }
            ]
        }
    )
}

const UpdateAllPetStock = async(productId,quantity)=>{
    await Pet.updateMany(
        {
            "_id" : productId
        },
        {   $set:{"quantity" : quantity}  }
    )
}

const UpdatePetStatus = async(productId,status)=>{
    await Pet.updateOne(
        {
            "_id" : productId
        },
        {   $set:{"status" : status}  }
    )
}


async function watchPet(){
    const db = mongoose.connection;
    const changeStreamUpdate = db.collection("pets").watch([
        {   $match:{operationType:"update"} }
    ])

    console.log("🔁 Watching Pet update.....")

    changeStreamUpdate.on("change", async(change)=>{
        
        const petId = change.documentKey._id;
        const updatedFields = change.updateDescription?.updatedFields;
        const pet = await Pet.findById(petId);

        for(let field in updatedFields){
            if(field.startsWith("quantity")){
                
                const quantity = updatedFields[field];

                if(pet.status !="Ngừng kinh doanh"){
                    
                    if(quantity == 0){
                        console.log("Change Pet's quantity to 0")
                        //Quantity = 0
                        await UpdateStateCartByPetId(petId,"Hết hàng")
                        await UpdatePetStatus(petId,"Hết hàng")

                    }
                    else if(quantity >0){
                        
                        console.log(`Change Pet's quantity to ${quantity}`)
                        //Quantity != 0
                        await IsStockDecrease(petId,quantity);
                        await IsStockIncrease(petId,quantity);
                        if(pet.status == "Hết hàng")
                            await UpdatePetStatus(petId,"Có sẵn")
                    }
                }
                
                


            }
            else if(field.startsWith("status")){
                const status = updatedFields[field];
                if(status == "Có sẵn"){
                    //Có sẵn
                    if(pet.quantity == 0){
                        //Update cart hết hàng
                        await UpdateStateCartByPetId(petId,"Hết hàng")
                        //Update status pet thành hết hàng
                        await UpdatePetStatus(petId,"Hết hàng")

                    }
                    else{
                        await IsStockDecrease(petId,pet.quantity);
                        await IsStockIncrease(petId,pet.quantity);
                    }
                }
                else if(status =="Hết hàng"){
                    //Update stock thành 0
                    await UpdateAllPetStock(petId,0)
                    //Update cart hết hàng
                    await UpdateStateCartByPetId(petId,"Hết hàng")
                }
                else if(status =="Ngừng kinh doanh"){
                    //Update cart hết hàng
                    await UpdateStateCartByPetId(petId,"Ngừng kinh doanh")
                }

            }
        }
    })

}
module.exports = watchPet