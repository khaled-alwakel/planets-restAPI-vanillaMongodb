const express = require("express");
const planetsController = require("../controllers/planetsController");
const router = express.Router();

//* param middleware
// here we specify first the parameter that we actually want to search for, so basically the parameter for which this middleware is gonna run
router.param("id", planetsController.checkID);

router
  .route("/")
  .get(planetsController.getAllPlanets)
  .post(planetsController.checkBody, planetsController.createPlanet); // check body before create product

router
  .route("/:id")
  .get(planetsController.getPlanet)
  .patch(planetsController.updatePlanet)
  .delete(planetsController.deletePlanet);

module.exports = router;
