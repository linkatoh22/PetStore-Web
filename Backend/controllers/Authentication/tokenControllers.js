const jwt = require('jsonwebtoken');
const User = require("../../models/userModel")
const {generateAccessToken} = require("../../utils/TokenFunc")


const refreshToken = (req,res,next) =>{
    try{
        const {refreshToken} = req.cookie;
        if(!refreshToken){
            throw Error("No refresh token found!")
        }
        const refreshToken_decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY);
        const user = User.findById(refreshToken_decoded);
        if(!user || user.refreshToken !=refreshToken){
            throw Error("Refresh token is not valid!")
        }

        const accessToken = generateAccessToken(user);
        return res.json({
            status:"SUCCESS",
            accessToken:accessToken
        })
    }
    catch(error){

        next(error);
    }

}

module.exports = {refreshToken};