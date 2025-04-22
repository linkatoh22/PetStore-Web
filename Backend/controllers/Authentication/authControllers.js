const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel")
const UserOTPVerification = require("../../models/UserOTPVerification")
const {transporter} = require("../../config/sendEmail");
const {generateAccessToken, generateRefreshToken} = require("../../utils/TokenFunc")
const {sendOTPVerificationEmail} = require("./authOTPControllers");


const signUp = async (req, res,next)=>{
    try{
        
        const {username,email,password,gender} = req.body;

        if(!username || !email || !password || !gender){
            res.status(400);
            throw new Error("All fields are mandatory!");
            
        }

        var userAvailable = await User.findOne({email:email});  
        
        if(userAvailable && userAvailable.verified == true){
            res.status(400);
            throw new Error("User already registed!");
        }

        const hashedPassword = await bcrypt.hash(password,10);
        
        if(!userAvailable){
            
            const user = await User.create(
                {

                    username,
                    email,
                    password:hashedPassword,
                    gender,
                    role:"customer"
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
        
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        
        if(!user||user.verified==false){

            res.status(400);
            throw Error("User not does not exist!")
        }
        
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        
        if(!isMatch){
             res.status(401);
            throw new Error ("Wrong Password or Username");
        }
        
        const accessToken = generateAccessToken(user)
        
        const refreshToken = generateRefreshToken(user)
        

        await User.updateOne({_id:user._id},  {refreshToken:refreshToken });
        res.cookie("refreshToken",refreshToken,{

            httpOnly:true,
            secure:true,
            sameSite:"Strict",
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,message:"Login Successfully"});
        

    }
    catch(error){
        next(error);
    }
}

const logOut = async(req,res,next) =>{
    try{
        //MỞ TAB HEADER: KEY cookies VALUE: refreshToken = {refreshToken}
        const refreshToken = req.cookies.refreshToken;
        
        if(!refreshToken){
            res.status(404)
            throw new Error("No refresh token found");
        }

        const user = await User.findOne({refreshToken}).lean();

        if(!user){
            res.status(400)
            throw new Error("Invalid Refresh Token");
        }

        await User.updateOne({refreshToken:refreshToken},{$unset:{refreshToken:refreshToken}})
        
        res.clearCookie("refreshCookie",{httpOnly:true,secure:true});
        return res.status(200).json({message:"Log Out Successfully"});

    }   
    catch(error){
        next(error);
    } 

}



module.exports = {logIn,signUp,logOut};