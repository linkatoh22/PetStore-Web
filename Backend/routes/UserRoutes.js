const express = require("express");
const router = express.Router();
const {getUserDetail,editUserDetail} = require("../controllers/User/userControllers")
const {AuthMiddleware} = require("../middlewares/authMiddleware")
router.route("/get-detail").get(AuthMiddleware,getUserDetail)
router.route("/update-detail").put(AuthMiddleware,editUserDetail)
module.exports = router