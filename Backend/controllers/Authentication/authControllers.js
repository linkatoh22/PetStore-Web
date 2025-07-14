const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel")
const UserOTPVerification = require("../../models/UserOTPVerification")
const {transporter} = require("../../config/sendEmail");
const {generateAccessToken, generateRefreshToken} = require("../../utils/TokenFunc")
const {sendOTPVerificationEmail} = require("./authOTPControllers");


const signUp = async (req, res,next)=>{
    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("signUp: ", fullUrl);

        const {email,password,username} = req.body;
        
        if( !email || !password || !username){
            res.status(400);
            throw new Error("Vui lòng nhập đủ các thông tin.");
            
        }
        
        var userAvailable = await User.findOne({email:email});  
        
        if(userAvailable && userAvailable.verified == true){
            res.status(400);
            throw new Error("Email này đã được đăng ký.");
        }
        
        const hashedPassword = await bcrypt.hash(password,10);
        
        if(!userAvailable){
            
            const user = await User.create(
                {
                    username,
                    email,
                    password:hashedPassword,

                    role:"customer",
                    isGoogleUser:false
                }
            )
            
            userAvailable = user;
        }
       
        
        await sendOTPVerificationEmail(userAvailable,res);
        
    }
    catch (error){
        
        next(error);
    }

    
    
}

const logIn = async (req, res,next)=>{
    try{
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("logIn: ", fullUrl);


        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        
        if(!user||user.verified==false){

            res.status(400);
            throw Error("Tài khoản email này chưa đăng ký.")
        }
        
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        
        if(!isMatch){
             res.status(401);
            throw new Error ("Sai mật khẩu hoặc email.");
        }
        
        const accessToken = generateAccessToken(user)
        
        const refreshToken = generateRefreshToken(user)
        

        await User.updateOne({_id:user._id},  {refreshToken:refreshToken });
        const Secure = process.env.SECURE == "true"? true:false;
        
        console.log("Secure: ",Secure);
        console.log("Secure: ",process.env.SAME_SITE);

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure: Secure, 
            //DEPLOY THÌ CHUYỂN SANG true
            sameSite: process.env.SAME_SITE, 
            //DEPLOY THÌ CHUYỂN SANG None
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json({
            message:"Login Successfully",
            status:"Success",
            code:200,
            token:{
                accessToken,
                refreshToken
            }
        
        });
        

    }
    catch(error){
        next(error);
    }
}

const logOut = async(req,res,next) =>{
    try{
        const refreshToken = req.cookies.refreshToken;
        
        if(!refreshToken){
            res.status(404)
            throw new Error("Không tìm thấy Refresh Token.");
        }

        const user = await User.findOne({refreshToken}).lean();
        
        if(!user){
            res.status(400)
            throw new Error("Refresh Token không hợp lệ.");
        }
        
        await User.updateOne({refreshToken:refreshToken},{$unset:{refreshToken:refreshToken}})
        
        res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: 'None' });

        return res.status(200).json({
            message:"Log Out Successfully",
            
            status:"Success",
            code:200,
        });

    }   
    catch(error){
        next(error);
    } 

}



module.exports = {logIn,signUp,logOut};