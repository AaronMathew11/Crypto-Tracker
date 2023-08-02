var user = require("../models/user");

const addUser = async (req, res) => {
  try {
    console.log(req.body);
    user = {
      email: req.body.email,
      name: req.body.name,
      id: req.body.id,
    };

    console.log("user before adding : ", user);
    await user.create(user);
    res.send({ status: 200, success: true, msg: user });
  } catch (e) {
    console.log(e);
    res.send({ status: 400, success: false, msg: "could not Add user" });
  }
};

const getUserList = async (req, res) => {
  try {
    result = await user.find();
    res.send({ status: 200, success: true, data: result });
  } catch (e) {
    res.send({ status: 400, success: false, msg: "could not fetch userList" });
  }
};

module.exports = { addUser, getUserList };
