const User = require("../../models/userModel")
const ResetToken = require("../../models/ResetPasswordTokenModel")
const mongoose = require("mongoose")
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const {transporter} = require("../../config/sendEmail");


const sendResetLinkToEmail= async(req,res,next)=>{

    try{

        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("sendResetLinkToEmail: ", fullUrl);


        const {email} = req.body;
        const user = await User.findOne({email:email});

        if(!user){
            res.status(400)
            throw Error("Người dùng không tồn tại");
        }

        const token = crypto.randomBytes(32).toString("hex");
        const tokenExpiry = Date.now()+3600000;

        console.log("Ngay het han c")

        const newUserResetToken = new ResetToken({ 
            email:email,
            userId:user._id,
            resetToken:token,
            resetTokenExpiry: tokenExpiry
        });

        await newUserResetToken.save();
        const resetUrl = `${process.env.ORIGIN}/reset-password/${token}`
        await transporter.sendMail({
            to:email,
            subject:"Đổi mật khẩu",
            html:`
                <div>
                    Đây là link sử dụng để đổi mật khẩu của bạn:
                    <a href="${resetUrl}">Bấm vào để đổi mật khẩu</a>
                </div>
            `
        });

        return res.status(200).json({
            status:"Success",
            code:200,
            message:"Email xác  nhận đã gửi",
        })

    }
    catch(error){
        next(error);
    }
}


const changePassword= async(req,res,next)=>{
    try{

        const {token} = req.params;
        const {password} = req.body;
        const ResetTokenAvailable = await ResetToken.findOne({
            resetToken:token,
            resetTokenExpiry:{$gt:Date.now()}
        })

        if(!ResetTokenAvailable){
            res.status(400)
            throw Error("Link đã hết hạn...");
        }
        const user = await User.findOne({_id:ResetTokenAvailable.userId})

        const hashedPassword = await bcrypt.hash(password,10);
        user.password=hashedPassword;
        
        await user.save();
        ResetTokenAvailable.resetTokenExpiry = Date.now();
        await ResetTokenAvailable.save();


        return res.status(200).json({
            message:"Change Password Successfully",
            status:"Success",
            code:200,
            
        
        });

    }
    catch(error){
        next(error)
    }
}



module.exports = {sendResetLinkToEmail,changePassword}