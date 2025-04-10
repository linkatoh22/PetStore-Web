const express  = require("express");
const router = express.Router();

const {fetchPetSoldDesc,PetQuery}=require("../controllers/Pet/PetController")

router.route("/pet-most-sold").get(fetchPetSoldDesc);
router.route("/pet-query").get(PetQuery);
module.exports = router