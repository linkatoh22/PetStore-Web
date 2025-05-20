const express  = require("express");
const router = express.Router();

const {fetchPetSoldDesc,PetQuery,SearchPet,getDetailPet}=require("../controllers/Pet/PetController")

router.route("/pet-most-sold").get(fetchPetSoldDesc);
router.route("/pet-query").get(PetQuery);
router.route("/pet-search").get(SearchPet);
router.route("/detail-pet").get(getDetailPet);
module.exports = router