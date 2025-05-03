const levelProduct ={
    "Phụ kiện": 1,
    "Phụ kiện của pet":2,
    "Category" : 3,
    "Subcategory":4,
}

const levelPet = {
    "All": 1,
    "Breed":2,
}


export const GenNavPet = (type,typePage,breed)=>{
    var navDirect =[];
    if(levelPet[typePage]>0){
        navDirect.push(
            { "Nav" : "Trang chủ" , "URL" : "/"}
        )
        navDirect.push(type=="Chó"? { "Nav":"Chó cảnh", "URL":"/category/cho-canh"} : { "Nav":"Mèo cảnh", "URL":"/category/meo-canh" })
    }
    if (levelPet[typePage]>1){
        navDirect.push(type=="Chó"? {  "Nav":`Chó ${breed}`, "URL":`/category/cho-canh/${breed}`}
        : {  "Nav":`Mèo ${breed}`, "URL":`/category/meo-canh/${breed}`})
    }
    return navDirect;
}
export const GenNavProduct = (type,typePage,Category,Subcategory) =>{
    var navDirect =[];
    if(levelProduct[typePage]>0){
        navDirect.push(
            { "Nav" : "Trang chủ" , "URL" : "/"}
            ,
            { "Nav":"Phụ kiện", "URL":"/category/phu-kien" }
        )
    }
    if (levelProduct[typePage]>1){
        navDirect.push(
            type=="Chó"? 
            { "Nav":"Phụ kiện của chó", "URL":"/category/phu-kien/phu-kien-cua-cho" } 
            : 
            { "Nav":"Phụ kiện của mèo", "URL":"/category/phu-kien/phu-kien-cua-meo" } 
        )
        
    }
    if (levelProduct[typePage]>2){
        navDirect.push(
            type=="Chó"? 
            {  "Nav":`${Category}`, "URL":`/category/phu-kien/phu-kien-cua-cho/${Category}`}
            : 
            {  "Nav":`${Category}`, "URL":`/category/phu-kien/phu-kien-cua-meo/${Category}`} 
        )
        
    }
    if(levelProduct[typePage]>3){ 
        navDirect.push(
            type=="Chó"? 
            {  "Nav":`${Subcategory}`, "URL":`/category/phu-kien/phu-kien-cua-cho/${Category}/${Subcategory}`}
            : 
            {  "Nav":`${Subcategory}`, "URL":`/category/phu-kien/phu-kien-cua-meo/${Category}/${Subcategory}`}
        )
    }
    return navDirect; 
}