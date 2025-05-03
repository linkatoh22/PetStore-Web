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
export const GenHeaderPet = (type,typePage,breed)=>{
    switch(levelPet[typePage]){
        case 1:
            return type=="Chó"?"Chó cảnh":"Mèo cảnh"
        case 2:
            return type=="Chó"? "Chó "+breed : "Mèo "+breed
        
            
    }
}


export const GenHeaderProduct = (type,typePage,Category,Subcategory) =>{
    switch(levelProduct[typePage]){
        case 1:
            return "Phụ kiện"
        case 2:
            return type=="Chó"? "Phụ kiện của chó" : "Phụ kiện của mèo"
        case 3:
            return `${Category}` 
        case 4:
            return`${Subcategory}`
        default:
            return "Sản phẩm"
    }

}