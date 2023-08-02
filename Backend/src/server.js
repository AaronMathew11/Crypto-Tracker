var express = require("express");
// var bodyParser = require("body-parser");
// var passport = require("passport");

var mongoose = require("mongoose");
var config = require("./config");
const { checkPriceAlerts } = require('./controller/priceControl');
var port = process.env.PORT || 5000;
const cors = require("cors");
var routes = require("./routes.js");
require('dotenv').config();
var app = express();




app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.get("/", function (req, res) {
  return res.send("hello the api is at http://localhost:" + port + "/api");
});


app.use("/api", routes);
mongoose.connect(process.env.DATABASE);

setInterval(checkPriceAlerts, 60000);
// setInterval(sendUpdate,)


const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Connected");
});
connection.on("error", (err) => {
  console.log("connection error");
  process.exit();
});

app.listen(port);
console.log(" yaaay : http://localhost:" + port);
