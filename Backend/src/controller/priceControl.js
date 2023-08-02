// controllers/trackListController.js
const TrackList = require('../models/TrackList');
const fetchPriceFromAPI = require('../services/cryptoApi'); // Implement this function to fetch prices from the API.
const { checkPriceLimits, sendNotification } = require('../services/priceAlert');

// Function to periodically check price limits and send notifications.
async function checkPriceAlerts() {
  try {
    const trackList = await TrackList.find();

    for (const coin of trackList) {
      const { id, upperLimit, lowerLimit, updateEmail } = coin;
      const currentPrice = await fetchPriceFromAPI(id);

      coin.currentPrice = currentPrice;
      await coin.save();

      await checkPriceLimits(coin);

      if (updateEmail) {
        await sendNotification(coin);
      }
    }
  } catch (error) {
    console.error('Error checking price alerts:', error);
  }
}

module.exports = { checkPriceAlerts };