const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserOTPVerificationSchema = new Schema (
    {
        userId: String,
        otp:String,
        createdAt: Date,
        expiresAt: Date,
    }
)

const UserOTPVerification = mongoose.model("UserOTPVerification",UserOTPVerificationSchema);

module.exports = UserOTPVerification