const express = require("express");
const router = express.Router();
const {AuthMiddleware}  = require("../middlewares/authMiddleware")
const {AddToCart,GetCart,EditCart,DeleteItem} = require("../controllers/Cart/CartControllers")

router.route("/add-to-cart").get(AuthMiddleware,AddToCart)
router.route("/get-cart").get(AuthMiddleware,GetCart);
router.route("/edit-cart").put(AuthMiddleware,EditCart);
router.route("/delete-cart-item").delete(AuthMiddleware,DeleteItem);
module.exports = router;