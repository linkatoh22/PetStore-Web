const express = require("express");
const router = express.Router();
const {AuthMiddleware}  = require("../middlewares/authMiddleware")
const {createOrder,getAllOrderUser,getDetailOrder,updateOrderStatus}= require("../controllers/Order/OrderControllers");


router.route("/create-order").post(AuthMiddleware,createOrder);
router.route("/get-all-order").get(AuthMiddleware,getAllOrderUser);
router.route("/get-detail-order").get(AuthMiddleware,getDetailOrder);
router.route("/update-order-status/:orderId").put(AuthMiddleware,updateOrderStatus);

module.exports= router;