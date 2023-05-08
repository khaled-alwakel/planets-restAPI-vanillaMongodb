const express = require("express");
const tasksController = require("../controllers/tasksController");
const router = express.Router();

//* param middleware
// here we specify first the parameter that we actually want to search for, so basically the parameter for which this middleware is gonna run
router.param("id", tasksController.checkID);

router
  .route("/")
  .get(tasksController.getAllTasks)
  .post(tasksController.checkBody, tasksController.createTask); // check body before create product

router
  .route("/:id")
  .get(tasksController.getTask)
  .patch(tasksController.updateTask)
  .delete(tasksController.deleteTask);

module.exports = router;
