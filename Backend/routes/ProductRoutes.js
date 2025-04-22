const express =  require("express")
const router = express.Router();

const {ProductTopSold,ProductQuery,ProductSearch,SearchAll} = require("../controllers/Products/ProductController")

router.route("/product-most-sold").get(ProductTopSold);
router.route("/product-query").get(ProductQuery);
router.route("/product-search").get(ProductSearch);
router.route("/search-all").get(SearchAll);
module.exports =router;