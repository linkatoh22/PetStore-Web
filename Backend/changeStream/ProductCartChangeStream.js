const mongoose = require("mongoose");
const Product = require("../models/ProductModel");
const Cart = require("../models/CartModel")

// Stock:
// - Khi thêm stock: các cart chứa variant quantity nhỏ hơn (đổi state thành đủ hàng), state của variant trong product đổi thành còn hàng 
// - Khi update giảm stock: các cart chứa variant quantity lớn hơn (đổi state thành không đủ hàng)
// - Khi stock = 0: các cart chứa variant quantity lớn hơn (đổi state thành không đủ hàng). state của variant trong product đổi thành Hết hàng


// Status:
// - Khi update stock ngừng kinh doanh: Tất cả các cart gồm variant cart chuyển thành ngung kinh doanh.
// - Muốn kinh doanh lại -> Bấm nút kinh doanh lại -> Hệ thống tự xác ịnh còn state là còn hàng hay không

const EmptyStock = async (variantId)=>{
    const result = await Cart.updateMany(
                        {"items.variant":variantId},
                        {
                            $set:{"items.$[elem].status":"Hết hàng"}
                        },
                        {
                            arrayFilters:[{"elem.variant":variantId}]
                        }
                    )
}

const NotEnoughStock = async (variantId,newStock) =>{
    const result_NotEnoughStock = await Cart.updateMany(
                        {
                            "items.variant":variantId
                        },
                        {   $set:   {   "items.$[elem].status":"Không đủ hàng" }   },
                        
                        {   arrayFilters:
                            [  
                                {   
                                    "elem.variant":variantId,
                                    "elem.quantity": {$gt:newStock}
                                }
                               
                            ]       
                        }
                    )
}


const Restock = async (variantId,newStock)=>{
    const result_ReStock = await Cart.updateMany(
                        {
                            "items.variant":variantId
                        },
                        {   $set:   {   "items.$[elem].status":"Đủ hàng" }   },
                        {   arrayFilters:[  
                                {   "elem.variant":variantId,
                                    "elem.quantity": {$lte:newStock}    
                                }
                            ]       
                        }
                    )

}

const ChangeStateCartProduct = async(productId,state)=>{
    
        const result_changeStateAllProduct = await Cart.updateMany(
            {
                "items.item":productId
            },
            { $set:{ "items.$[elem].status":state}},
            { 
                arrayFilters: 
                [
                    {"elem.item": productId}
                ]
            }
        )
    
}
const ChangeStateProduct = async(productId,state) =>{
    const result_changeStateProduct = await Product.updateOne(
        {
            "_id":productId
        },
        { $set:{ "status":state}}
    )

}

const UpdateAllStockProductVariants = async(productId,quantity)=>{
    const result_updateAllStockProductVariants = await Product.updateMany(
        {
            "_id" : productId
        },
        {   $set:{"variants.$[].stock" : quantity}  }
    )
}

async function watchProductVariants(){
    const db = mongoose.connection;
    const changeStream = db.collection("products").watch([
        {   $match  : { operationType:"update"  } }
    ]);

    console.log("🔁 Watching Product Variants update.....")

    changeStream.on("change",async(change)=>{
        const productId = change.documentKey._id;
        const updatedFields = change.updateDescription?.updatedFields;
        
        for(let field in updatedFields){ //For .. in duyệt qua key (không phải value)

            if(field.startsWith("variants") && field.endsWith(".stock")){
                const parts = field.split(".");
                const variantIndex = parts[1];
                const newStock = updatedFields[field];

                    const product = await Product.findById(productId);
                    const variant = product.variants[variantIndex];
                    const variantId = variant._id;
                    
                if(newStock === 0){
                    if(product.variants[variantIndex].status != "Ngừng kinh doanh"){
                        console.log(`Bạn vừa update stock của ${product.name} có phân loại: ${variantId} thành 0` )
                        await EmptyStock(variantId);
                        console.log(`Update sản phẩm ${product.name} variant ${variantId} thành status Hết hàng`)
                    }
                    //OK
                }
                else{
                    console.log(`Bạn vừa update stock`);
                    if(product.variants[variantIndex].status != "Ngừng kinh doanh"){
                        //Giảm stock
                        
                        await NotEnoughStock(variantId,newStock);
                        //Thêm stock
                        await Restock(variantId,newStock);
                    }
                    console.log(`Update sản phẩm ${product.name} variant ${variantId} thành`)

                }
                if(product.status !="Ngừng kinh doanh"){

                    const sum = product.variants.reduce((a,b)=> a+b.stock,0);
                    
                    if(sum==0 && product.status!="Hết hàng"){
                        console.log(`Chuyển state ${product.name} product sang Hết hàng` )
                        await ChangeStateProduct(productId,"Hết hàng")
                    }
                    else if(sum>0 && product.status!="Có sẵn"){
                        console.log(`Chuyển state ${product.name} product sang Có sẵn` )
                        await ChangeStateProduct(productId,"Có sẵn")
                    }
                }
                
                

            }
            else if(field.startsWith("status")){
                const product = await Product.findById(productId);
                const newStatus = updatedFields[field];
                if(newStatus === "Ngừng kinh doanh"){

                    console.log(`Chuyển tất cả cart có ${product.name} product sang state Ngừng kinh doanh` )
                    
                    await ChangeStateCartProduct(productId,"Ngừng kinh doanh");

                }
                else if (newStatus === "Có sẵn"){
                    // 1.1) SUM lại xem nó có bằng = 0? 
                    const sum = product.variants.reduce((a,b)=> a+b.stock,0);
                    console.log(sum);
                    if(sum == 0 ){

                        // Chuyển tất cả state của variant trong product thành Hết hàng
                        
                        await ChangeStateCartProduct(productId,"Hết hàng");

                        // Update lại Product thành Hết hàng
                        await ChangeStateProduct(productId,"Hết hàng")
                       
                        
                    }
                    else{
                        product.variants.map(async (item)=>
                            {
                                await NotEnoughStock(item._id, item.stock);
                                await Restock(item._id, item.stock);
                            }
                        )
                        
                    }
                    

                }
                else if(newStatus === "Hết hàng"){

                   
                    await UpdateAllStockProductVariants(productId,0);

                    
                    await ChangeStateCartProduct(productId,"Hết hàng");

                }
                
            }

        }
    })


}

module.exports = watchProductVariants;