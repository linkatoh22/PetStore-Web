const express  = require("express");
const router = express.Router();

const {fetchPetSoldDesc,PetQuery,SearchPet}=require("../controllers/Pet/PetController")

router.route("/pet-most-sold").get(fetchPetSoldDesc);
router.route("/pet-query").get(PetQuery);
router.route("/pet-search").get(SearchPet);
module.exports = router