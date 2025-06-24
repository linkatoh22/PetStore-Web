const mongoose = require("mongoose")
const Order = require("../models/OrderModel")
const Product = require("../models/ProductModel")
const Pet = require("../models/PetModel")

async function watchOrder(){
    const db = mongoose.connection;
    const changeStreamUpdate = db.collection("orders").watch(
        [
            {$match:{operationType:"update"}}
        ]
    )
    console.log("🔁 Watching Order update.....")

    changeStreamUpdate.on("change",async(change)=>{
        const orderId = change.documentKey._id;
        const updatedFields = change.updateDescription?.updatedFields;
        const order = await Order.findById(orderId);

        for(let field in updatedFields){
            if(field === "status"){
                const status = updatedFields[field];
                order.statusHistory.push({
                    status:status,
                    updatedAt:new Date()
                })

                
            }

        }
        await order.save();
        console.log(`📦 Order ${orderId} status updated to '${order.status}'`);

    })
}

module.exports = watchOrder