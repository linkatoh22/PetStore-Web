const mongoose = require("mongoose")
const PetSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please add the Pet's name"],
    },
    sku:{

        type:String,
        require:[true,"Please add the Pet's SKU"]
    },
    breed:{
        type:String,
        require:[true,"Please add the Pet's breed"]
    },
    gender:{
        type:String,
        require:[true,"Please add the Pet's gender"]
    },
    age:{
        type:String,
        require:[true,"Please add the Pet's age"]
    },
    color:{
        type: [String], 
        required: [true,"Please add the Pet's color"]
    },

    status:{
        type:String,
        enum:["Có sẵn","Hết Hàng"],
        required: [true,"Please add the Pet's status"]
    },
    dewormed:{
        type:Boolean,
        required: [true,"Please add the Pet's dewormed status"]
    },
    source:{
        type: String, 
        required: [true,"Please add the Pet's source"]
    },
    health:{
        type: String, 
        required: [true,"Please add the Pet's health"]
    },
    shipping:{
        type: String, 
        required: [true,"Please add the Pet's color"]
    },
    vaccinated:{
        type:Boolean,
        required: [true,"Please add the Pet's dewormed vaccinated"]
    },
    quantity:{
        type:Number,
        required: [true,"Please add the Pet's quantity"],
        min: 0
    },
    species:{
        type:String,
        enum:["Chó","Mèo"],
        require:[true,"Please add the Pet's species"]
    },
    price: 
    { 
        type: Number, 
        required: [true,"Please add the Pet's price"], 
        min: 0 
    },
    image:{
        type: [String]
    },
    sold:
    { 
        type: Number, 
        // required: [true,"Please add the Pet's sold quantity"], 
        min: 0 
    }
},
    {
        timestamps:true
    }
);


PetSchema.index(
    { name: 'text',breed:'text',color: 'text' },
    { weights: { name: 10,breed:9,color:8} }
  );
module.exports = mongoose.model("Pet",PetSchema);   