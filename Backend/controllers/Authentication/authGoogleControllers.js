const { generateAccessToken,generateRefreshToken } = require("../../utils/TokenFunc");
const User = require("../../models/userModel")
const googleCallback = async (req,res,next) =>{

    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("googleCallback: ", fullUrl);

        const user = req.user;
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        await User.updateOne({_id:user._id},{$set: {refreshToken:refreshToken}});

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:"Strict",
            maxAge:7 * 24 * 60 * 60 * 1000,
        })
        res.redirect(`${process.env.ORIGIN}/google-success?accessToken=${accessToken}`);
        // return res.status(200).json({
        //     message:"Google Login Successfully",
        //     status:"Success",
        //     code:200,
        //     token:{
        //         accessToken,
        //         refreshToken
        //     }
            
        // })
    }   
    catch(error){
        next(error);
    }
}
module.exports = {googleCallback};