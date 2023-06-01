const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

module.exports = () => {
  //GET events
  router.get("/", eventsController.index);

  //POST events/add
  router.post("/add", eventsController.create);

  //DELETE events/delete/:id
  router.delete("/delete/:id", eventsController.delete);

  return router;
};
