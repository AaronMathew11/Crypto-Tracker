// services/cryptoApi.js
const axios = require('axios');

// Function to fetch cryptocurrency price from the CoinGecko API.
async function fetchPriceFromAPI(coinId) {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`);
    const priceData = response.data[coinId];
    const price = priceData.usd;
    return price;
  } catch (error) {
    console.error('Error fetching price from the API:', error.message);
    throw error;
  }
}

module.exports = fetchPriceFromAPI;
