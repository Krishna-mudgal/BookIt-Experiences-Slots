const express = require("express");
const {handleCreatePromo, handleVerifyPromo} = require("../controllers/promo");

const promoRouter = express.Router();

promoRouter.post("/", handleCreatePromo);
promoRouter.post("/verify", handleVerifyPromo);

module.exports = {
    promoRouter
}