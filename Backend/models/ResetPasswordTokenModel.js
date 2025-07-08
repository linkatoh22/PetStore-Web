const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResetTokenSchema = new Schema (
    {
        email:String,
        userId: String,
        resetToken:String,
        resetTokenExpiry:Date,
    }
)

const ResetToken = mongoose.model("ResetToken",ResetTokenSchema);

module.exports = ResetToken