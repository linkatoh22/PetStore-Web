const express=  require("express");
const router= express.Router();

const {logIn,logOut,signUp} = require("../controllers/Authentication/authControllers.js")
const {verifyOTP,resendOTP} = require("../controllers/Authentication/authOTPControllers.js");

const {googleCallback} = require("../controllers/Authentication/authGoogleControllers.js")
const passport = require("passport");
require('../config/google.js')

//LOG IN AND SIGN UP GOOGLE

router.get('/google',
    passport.authenticate('google',{
        scope:['profile','email']
    })
);

router.get(
    '/google/callback',
    passport.authenticate('google',{session:false,failureRedirect:'/login'}),googleCallback
    
)


//LOGIN AND SIGN UP NORMAL
router.route("/signup").post(signUp);

router.route("/login").post(logIn);

router.route("/logout").post(logOut);


///OTP
router.route("/verifyOTP").post(verifyOTP);
router.route("/resendOTP").post(resendOTP);
module.exports = router;