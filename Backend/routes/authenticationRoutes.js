const express=  require("express");
const router= express.Router();

const {logIn,logOut,signUp} = require("../controllers/Authentication/authControllers.js")
const {verifyOTP,resendOTP} = require("../controllers/Authentication/authOTPControllers.js");

const {googleCallback} = require("../controllers/Authentication/authGoogleControllers.js")
const passport = require("passport");

const {handleAccessToken} = require("../controllers/Authentication/tokenControllers.js")
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

//RESET REFRESH TOKEN

router.route("/reset-access-token").post(handleAccessToken)


//LOGIN AND SIGN UP NORMAL
router.route("/sign-up").post(signUp);

router.route("/log-in").post(logIn);

router.route("/log-out").post(logOut);


///OTP
router.route("/verify-OTP").post(verifyOTP);
router.route("/resend-OTP").post(resendOTP);
module.exports = router;