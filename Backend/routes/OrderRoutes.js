const express = require("express");
const router = express.Router();
const {AuthMiddleware}  = require("../middlewares/authMiddleware")
const {createOrder,getAllOrderUser,getDetailOrder}= require("../controllers/Order/OrderControllers");


router.route("/create-order").post(AuthMiddleware,createOrder);
router.route("/get-all-order").get(AuthMiddleware,getAllOrderUser);
router.route("/get-detail-order").get(AuthMiddleware,getDetailOrder);

module.exports= router;