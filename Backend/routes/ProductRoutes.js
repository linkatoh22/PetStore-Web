const express =  require("express")
const router = express.Router();

const {ProductTopSold,ProductQuery,ProductSearch,SearchAll,getDetailProduct,RecommendProduct} = require("../controllers/Products/ProductController")
// const {InsertData} = require("../controllers/Products/insertProduct")
router.route("/product-most-sold").get(ProductTopSold);
router.route("/product-query").get(ProductQuery);
router.route("/product-search").get(ProductSearch);
router.route("/search-all").get(SearchAll);
router.route("/detail-product").get(getDetailProduct);
router.route("/recommend-product").get(RecommendProduct);
// router.route("/insert-data").get(InsertData);
module.exports =router;