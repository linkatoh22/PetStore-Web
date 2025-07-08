const express = require("express")
const router = express.Router();

const {sendResetLinkToEmail,changePassword}= require("../controllers/ResetPassword/ResetPassword")

router.route("/send-link-to-email").post(sendResetLinkToEmail);

router.route("/reset-password/:token").post(changePassword);

module.exports = router;