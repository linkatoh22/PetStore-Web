const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
        username:{
            type:String
        
        },

        email:{
            type:String,
            required:[true,"Please add the email"],
            unique:true,
            match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"]
        },

        password:{
            type:String,
            required:function() {
                return !this.isGoogleUser; 
            },
        },

        gender:{

            type:String,
            enum:['Nữ','Nam','Khác'],
            default:'Khác'
        },

        phoneNumber:{
            type: String
        },

        address:[
            {
            diachi: String,
            tinhThanhPho: String,
            quanHuyen: String,
            phuongXa: String
            }
        ],

        cardInfo:[
            {
                nganHang: String,
                ngayPhatHanh: { type: Date },
                soThe: { type: String, select: false },
                tenChuThe: String,
                ngayHetHan: { type: Date }
            }
        ],

        role:{
            type:String,
            enum:['customer','admin'],
            required:[true,"Vui long them role"]
        },
        verified:{
            type:Boolean,
            default:false,
            
        },
        refreshToken:{

            type:String
        },
        isGoogleUser:{
            type:Boolean,
            required:[true,"Please type of the user"],
            default:false
        }
    
    }
    ,
    {
        timestamps: true
    }


    
);

module.exports = mongoose.model("User",userSchema);