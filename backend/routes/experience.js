const express = require("express");
const {handleCreateExperience, handleGetAllExpriences, handleGetExperiencesByID} = require("../controllers/experience");

const experienceRoute = express.Router();

experienceRoute.post("/", handleCreateExperience);
experienceRoute.get("/", handleGetAllExpriences);
experienceRoute.get("/:id", handleGetExperiencesByID);

module.exports = {
    experienceRoute
};