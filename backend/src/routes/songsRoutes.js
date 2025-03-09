// const express = require('express');
// const { getSongs } = require('../controllers/songsController');

// const router = express.Router();

// router.get('/', getSongs);

// module.exports = router;

const express = require('express');
const { getSongs, getRandom, getSong } = require('../controllers/songsController');

const router = express.Router();

router.get('/songs', getSongs);
router.get('/songs/random', getRandom);
router.get('/songs/:title', getSong);

module.exports = router;


// // src/routes/songsRoutes.js
// const express = require('express');
// const songsController = require('../controllers/songsController');

// const router = express.Router();

// // GET /api/songs - Get all songs
// router.get('/', songsController.getAllSongs);

// module.exports = router;