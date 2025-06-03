const mongoose = require("mongoose");
const Product = require("../models/ProductModel");
const Cart = require("../models/CartModel")

async function watchProductVariants(){
    const db = moongose.connection;
    const changeStream = db.collection("products").watch([
        {   $match  : { operationType:"update"  } }
    ]);

    console.log("🔁 Watching Product Variants for stock = 0 ...")

    changeStream.on("change",async(change)=>{
        const productId = change.documentKey._id;
        const updatedFields = change.updateDescription?.updatedFields;
        
        for(let field in updatedFields){ //For .. in duyệt qua key (không phải value)
            if(field.startsWith("variants") && field.endsWith(".stock")){
                const parts = field.split(".");
                const variantIndex = parts[1];
                const newStock = updatedFields[field];

                if(newStock === 0){
                    const product = await Product.findById(productId);
                    const variant = product.variants[variantIndex];
                    const variantId = variant._id;

                    const result = await Cart.updateMany(
                        {"items.variant":variantId},
                        {
                            $set:{"items.$[elem].status":"Hết hàng"}
                        },
                        {
                            arrayFilters:[{"elem.variant":variantId}]
                        }
                    )

                    console.log(`Updated all of the cart that have ${variantId} in it to status Hết hàng`)
                }

            }
        }
    })


}