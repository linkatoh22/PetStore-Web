const express = require("express");
const router = express.Router();
const {AuthMiddleware}  = require("../middlewares/authMiddleware")
const {AddToCart,GetCart,GetDetailCart} = require("../controllers/Cart/CartControllers")

router.route("/add-to-cart").get(AddToCart)
router.route("/get-cart").get(AuthMiddleware,GetCart);
router.route("get-detail-cart").get(AuthMiddleware,GetDetailCart);

module.exports = router;