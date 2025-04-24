const { generateAccessToken,generateRefreshToken } = require("../../utils/TokenFunc");
const User = require("../../models/userModel")
const googleCallback = async (req,res,next) =>{

    try{
        
        const user = req.user;
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        await User.updateOne({_id:user._id},{refreshToken});

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:"Strict",
            maxAge:7 * 24 * 60 * 60 * 1000,
        })

        res.status(200).json({
            accessToken,
            refreshToken,
            message:"Google login successfully"
        })
    }   
    catch(error){
        next(error);
    }
}
module.exports = {googleCallback};