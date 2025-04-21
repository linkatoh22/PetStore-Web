const express =  require("express")
const router = express.Router();

const {ProductTopSold} = require("../controllers/Products/ProductController")

router.route("/product-most-sold").get(ProductTopSold);

module.exports =router;