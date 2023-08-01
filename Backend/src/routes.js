var express = require("express"),
  routes = express.Router();
var trackingController = require("./controller/trackingController");

//update tracking list
routes.post("/addTrackingCoin", trackingController.addCoin);

//get tracking List
routes.get("/getTrackingList", trackingController.getTrackList);

module.exports = routes;
