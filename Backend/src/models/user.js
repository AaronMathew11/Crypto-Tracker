var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  id: {
    type: String,
    required:true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userSchema", userSchema);
