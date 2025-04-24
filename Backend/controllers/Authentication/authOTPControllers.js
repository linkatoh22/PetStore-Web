const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel")
const UserOTPVerification = require("../../models/UserOTPVerification")
const {transporter} = require("../../config/sendEmail");
const {generateToken} = require("../../utils/TokenFunc")


const sendOTPVerificationEmail = async ({_id,email},res,next)=>{
    try{
        const otp =  `${Math.floor(1000 + Math.random() * 9000)}`; 
        const mailOptions ={

            from: process.env.USER,
            to:email,
            subject: "Verify your email",
            html:`<p>Chào! Bạn vừa sử dụng email này để đăng ký website của chúng mình đây là mã OTP xác thực của bạn:</p>\
            <h1>${otp}</h1>
            <p>OTP này sẽ hết hạn trong 5 phút</p>`
        }

        const hashedOTP = await bcrypt.hash(otp,10);
        const newUserOTPVerification = new UserOTPVerification({ //tao OTP cua nguoi dung
            userId:_id,
            otp:hashedOTP,
            createdAt:Date.now(), 
            expiresAt:Date.now() + 3600000,
        });

        await newUserOTPVerification.save(); //save lai
        await transporter.sendMail(mailOptions); //gui mail
        res.json({

            status:"PENDING",
            message:"Verification otp email sent",
            data:{
                userid:_id,
                email,

            },
        })

    }

    catch(error){
        next(error);

    }

}

const verifyOTP  = async (req,res,next)=>{

    try{
        console.log("RAN HERE VERIFY")
        let {userId,otp} = req.body; //lay id va otp ng dung
        console.log("userid ",userId);
        console.log("otp ",otp);
        if(!userId||!otp){
            res.status(400)
            throw Error("Empty otp details are not allowed"); //empty
        }
        else{
            const UserOTPVerificationRecords = await UserOTPVerification.find({
                userId,
            }); //tim otp user nay

            if (UserOTPVerificationRecords.length<=0){
                //No RECORDS FOUND
                res.status(400)
                throw new Error (
                    "Account record exist or has been verified already. Please sign up or log in"
                )
            }
            else{

                const {expiresAt} = UserOTPVerificationRecords[0];
                const hashedOTP = UserOTPVerificationRecords[0].otp;
                
                if(expiresAt< Date.now()){
                    //expire
                    await UserOTPVerificationRecords.deleteMany({userId})
                    res.status(401)
                    throw new Error ("Code has expires. Please request again.")
                }
                else{

                    const validOTP = await bcrypt.compare(otp,hashedOTP);
                    if(!validOTP){
                        //supplied otp is wrong
                        res.status(401)
                        throw new Error("Invalid code passed. Check your inbox")
                    }
                    else{
                        //success
                        await User.updateOne({_id:userId}, {verified:true} );
                        await UserOTPVerification.deleteMany({userId})
                        
                        return res.status(200).json({
                            
                            message:"User email verified successfully"
                        })

                           
                   }
                }
            }
        }
        
    }
    catch(error){
        next(error);

    }

}
//resend OTP
const resendOTP = async (req,res,next) =>{

    try{
        let{userId,email}  = req.body;

        if(!userId||!email){
            res.status(400)
            throw Error("Empty user details are not allowed");
        }
        else{

            await UserOTPVerification.deleteMany({userId});
            sendOTPVerificationEmail({_id:userId,email},res)
        }
    }
    catch(error){

        next(error);
    }
    

}

module.exports = {sendOTPVerificationEmail,verifyOTP,resendOTP}