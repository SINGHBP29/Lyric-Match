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
const { generateLyrics, checkAnswer } = require('./src/controllers/lyricsController'); 

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use('/api/lyrics', lyricsRoutes);
app.use('/api/songs', songRoutes);

app.get('/api/generate-lyrics', generateLyrics);
app.post('/api/check-answer', checkAnswer);

module.exports = app;

