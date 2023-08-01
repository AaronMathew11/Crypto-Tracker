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
  updateEmail: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("trackListSchema", trackListSchema);
