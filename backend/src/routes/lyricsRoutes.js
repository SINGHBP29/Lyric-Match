const express = require('express');
const { generateLyrics, checkAnswer } = require('../controllers/lyricsController');

const router = express.Router();

router.get('/generate', generateLyrics);
router.post('/check-answer', checkAnswer);

module.exports = router;

// // src/routes/lyricsRoutes.js
// const express = require('express');
// const lyricsController = require('../controllers/lyricsController');

// const router = express.Router();

// // GET /api/lyrics/generate - Generate lyrics
// router.get('/generate', lyricsController.generateLyrics);

// // POST /api/lyrics/check - Check answer
// router.post('/check', lyricsController.checkAnswer);

// // POST /api/lyrics/suggest - Suggest songs based on lyrics
// router.post('/suggest', lyricsController.suggestSongs);

// module.exports = router;