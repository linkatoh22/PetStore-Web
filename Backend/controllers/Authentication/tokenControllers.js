const jwt = require('jsonwebtoken');
const User = require("../../models/userModel")
const {generateAccessToken} = require("../../utils/TokenFunc")


const handleAccessToken = async (req,res,next) =>{
    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("handleAccessToken: ", fullUrl);
        
        const refreshToken = req.cookies.refreshToken;
       
        if(!refreshToken){
            res.status(404)
            throw Error("Không tìm thấy Refresh Token.")
        }

        // const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY);
        // console.log("decoded:",decoded)
        const user = await User.findOne({refreshToken:refreshToken});
        
        
        if(!user){
            res.status(403)
            throw Error("Refresh token không hợp lệ.")
        }

        const accessToken = generateAccessToken(user);
        return res.status(200).json({
            message:"Generate Access Token Successfully",
            status:"Success",
            code:200,
            accessToken:accessToken
        })

    }
    catch(error){

        next(error);
    }

}

module.exports = {handleAccessToken};