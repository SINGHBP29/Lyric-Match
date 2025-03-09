// require('dotenv').config();

// const { Together } = require('together-ai');

// const together = new Together({
//   apiKey: process.env.TOGETHER_API_KEY 
// });

// console.log("Together API Key exists:", !!process.env.TOGETHER_API_KEY);

// module.exports = together;

// src/config/dotenvConfig.js
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 5000,
    TOGETHER_API_KEY: process.env.TOGETHER_API_KEY
};
