const User = require("../../models/userModel")
const getUserDetail = async (req,res,next) =>{
    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("getUserDetail: ", fullUrl);

        const user_token = req.user;
        const user = await User.find({_id:user_token._id})
        if(!user){
            res.status(404);
            throw Error("Không tìm thấy người dùng.")
        }
        return res.status(200).json({
            message:"Retrieve User Data Successfully",
            status:"Sucessfully",
            code:200,
            user})
    }
    catch(error){
        next(error);
    }
}

const editUserDetail = async (req,res,next) =>{
    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("editUserDetail: ", fullUrl);
        
        const userId = req.user._id;
        const {username,gender,phonenumber,address} = req.body;

        if(!username||!gender||!phonenumber||!address){
            res.status(400)
            throw Error("Vui lòng nhập đủ thông tin.")
        }

        const user = await User.findByIdAndUpdate(
            userId,
            {username:username,gender:gender,phonenumber:phonenumber,address:address},
            {new:true}
        )

        if(!user){
            res.status(400);
            throw Error("Người dùng không tồn tại.")
        }

        return res.status(200).json({
            message:"Updated User Successfully",
            status:"Successfully",
            code:200,
            user
        })

    }
    catch(error){
        next(error);
    }
}

module.exports = {getUserDetail,editUserDetail}