// services/priceAlert.js
const nodemailer = require('nodemailer');
const TrackList = require('../models/TrackList');
const fetchPriceFromAPI = require('./cryptoApi'); 

// Function to check price limits and trigger alerts if necessary.
async function checkPriceLimits(coin) {
  const { id, upperLimit, lowerLimit, currentPrice, userEmail } = coin;
  const latestPrice = await fetchPriceFromAPI(id);

  if (latestPrice >= upperLimit && currentPrice < upperLimit) {
    await sendNotification(id, 'Upper limit exceeded', userEmail);
  } else if (latestPrice <= lowerLimit && currentPrice > lowerLimit) {
    await sendNotification(id, 'Lower limit exceeded', userEmail);
  }
}

async function sendNotification(coinId, message, userEmail) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testactive29@gmail.com',
      pass: 'Test@123',
    },
  });

  const mailOptions = {
    from: 'testactive29@gmail.com',
    to: userEmail,
    subject: 'Price Alert for ' + coinId,
    text: message,
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = { checkPriceLimits, sendNotification };
