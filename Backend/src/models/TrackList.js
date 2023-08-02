var mongoose = require("mongoose");

var trackListSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  upperLimit: {
    type: String,
    trim: true,
  },
  lowerLimit: {
    type: String,
    trim: true,
  },
  currentPrice: {
    type: String,
    default: 0,
  },
  updateEmail: {
    type: Boolean,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("trackListSchema", trackListSchema);
