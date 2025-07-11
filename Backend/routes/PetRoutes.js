const express  = require("express");
const router = express.Router();

const {fetchPetSoldDesc,PetQuery,SearchPet,getDetailPet,RecommendPet}=require("../controllers/Pet/PetController")

router.route("/pet-most-sold").get(fetchPetSoldDesc);
router.route("/pet-query").get(PetQuery);
router.route("/pet-search").get(SearchPet);
router.route("/detail-pet").get(getDetailPet);
router.route("/recommend-pet").get(RecommendPet);
module.exports = router