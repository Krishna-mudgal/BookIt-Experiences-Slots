const express = require("express");
const {handleCreateExperience, handleGetAllExpriences} = require("../controllers/experience");

const experienceRoute = express.Router();

experienceRoute.post("/", handleCreateExperience);
experienceRoute.get("/", handleGetAllExpriences);

module.exports = {
    experienceRoute
};