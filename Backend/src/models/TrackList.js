var mongoose = require("mongoose");

var trackListSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  upperLimit: {
    type: Number,
    trim: true,
  },
  lowerLimit: {
    type: Number,
    trim: true,
  },
  currentPrice: {
    type: Number,
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
