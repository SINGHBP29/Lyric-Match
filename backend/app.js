// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const lyricsRoutes = require('./src/routes/lyricsRoutes');
// const songRoutes = require('./src/routes/songsRoutes');

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// app.use('/api/lyrics', lyricsRoutes);
// app.use('/api/songs', songRoutes);

// module.exports = app;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importing routes
const lyricsRoutes = require('./src/routes/lyricsRoutes');
const songRoutes = require('./src/routes/songsRoutes');
const { generateLyrics, checkAnswer } = require('./src/controllers/lyricsController'); // ✅ Import the controller

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use('/api/lyrics', lyricsRoutes);
app.use('/api/songs', songRoutes);

// ✅ Fix: Add missing endpoints
app.get('/api/generate-lyrics', generateLyrics);
app.post('/api/check-answer', checkAnswer);

module.exports = app;


// // // src/app.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const lyricsRoutes = require('./routes/lyricsRoutes');
// const songsRoutes = require('./routes/songsRoutes');
// // const myRoutes = require('./routes/myRoutes');  

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use('/api/lyrics', lyricsRoutes);
// app.use('/api/songs', songsRoutes);

// // Legacy API routes for backward compatibility
// app.get('/api/generate-lyrics', (req, res) => {
//     res.redirect(307, '/api/lyrics/generate');
// });

// app.post('/api/check-answer', (req, res) => {
//     res.redirect(307, '/api/lyrics/check');
// });

// app.post('/api/suggest-songs', (req, res) => {
//     res.redirect(307, '/api/lyrics/suggest');
// });

// module.exports = app;