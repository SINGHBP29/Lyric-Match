require('dotenv').config(); // ✅ Load environment variables first
const express = require('express');
const cors = require('cors');
const app = require('./app'); // ✅ Import the app from your src directory

const port = process.env.PORT || 5000;

// ✅ Allow requests from frontend (React app)
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); // Ensure JSON parsing is enabled

// ✅ Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Using Together AI model: meta-llama/Llama-3.3-70B-Instruct-Turbo`);
  console.log(`Together API key configured: ${process.env.TOGETHER_API_KEY ? 'Yes' : 'No'}`);
});

// server.js
