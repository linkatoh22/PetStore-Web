const express = require("express");
const router = express.Router();
const {AuthMiddleware}  = require("../middlewares/authMiddleware")
const {AddToCart,GetCart,EditCart} = require("../controllers/Cart/CartControllers")

router.route("/add-to-cart").get(AuthMiddleware,AddToCart)
router.route("/get-cart").get(AuthMiddleware,GetCart);
router.route("edit-cart").get(AuthMiddleware,EditCart);

module.exports = router;