const express = require("express");
const router = express.Router();
const {AuthMiddleware}  = require("../middlewares/authMiddleware")
const {AddToCart,GetCartActive,EditCart,DeleteItem,GetItemUnactive} = require("../controllers/Cart/CartControllers")

router.route("/add-to-cart").post(AuthMiddleware,AddToCart)

router.route("/get-cart").get(AuthMiddleware,GetCartActive);
router.route("/get-cart-unactive").get(AuthMiddleware,GetItemUnactive);

router.route("/edit-cart").put(AuthMiddleware,EditCart);

router.route("/delete-cart-item").post(AuthMiddleware,DeleteItem);

module.exports = router;