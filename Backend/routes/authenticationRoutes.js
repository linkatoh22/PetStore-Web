const express=  require("express");
const router= express.Router();

const {logIn,logOut,signUp} = require("../controllers/Authentication/authControllers.js")
const {verifyOTP,resendOTP} = require("../controllers/Authentication/authOTPControllers.js")
router.route("/login").post(logIn);
router.route("/logout").post(logOut);
router.route("/signup").post(signUp);

router.route("/verifyOTP").post(verifyOTP);
router.route("/resendOTP").post(resendOTP);
module.exports = router;