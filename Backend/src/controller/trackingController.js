var trackList = require("../models/TrackList");

const addCoin = async (req, res) => {
  try {
    coin = {
      id: req.body.id,
      upperLimit: req.body.upperLimit,
      lowerLimit: req.body.lowerLimit,
      updateEmail: req.body.updateEmail,
      currentPrice: req.body.currentPrice,
      userEmail: req.body.email,
    };

    console.log("coin before adding : ", coin);
    await trackList.create(coin);
    res.send({ status: 200, success: true, msg: coin });
  } catch (e) {
    console.log(e);
    res.send({ status: 400, success: false, msg: "could not Add coin" });
  }
};

const getTrackList = async (req, res) => {
  try {
    result = await trackList.find();
    res.send({ status: 200, success: true, data: result });
  } catch (e) {
    res.send({ status: 400, success: false, msg: "could not fetch Tracklist" });
  }
};

module.exports = { addCoin, getTrackList };
