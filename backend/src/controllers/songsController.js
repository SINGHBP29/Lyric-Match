// const { getSongByTitle, getRandomSong } = require('../services/songService');

// function getSongs(req, res) {
//     res.json(songMetadata);
// }

// module.exports = { getSongs };

const { getAllSongs, getRandomSong, getSongByTitle } = require('../services/songService');

const getSongs = (req, res) => {
    const songs = getAllSongs(); // ✅ Using function from songService
    res.json(songs);
};

const getRandom = (req, res) => {
    const song = getRandomSong(); // ✅ Using function from songService
    res.json(song);
};

const getSong = (req, res) => {
    const { title } = req.params;
    const song = getSongByTitle(title);
    if (song) {
        res.json(song);
    } else {
        res.status(404).json({ message: "Song not found" });
    }
};

module.exports = { getSongs, getRandom, getSong };


// // src/controllers/songsController.js
// const songService = require('../services/songService');

// // Get all songs
// const getAllSongs = (req, res) => {
//     try {
//         const songs = songService.getAllSongs();
//         res.json(songs);
//     } catch (error) {
//         console.error('Error fetching songs:', error.message);
//         res.status(500).json({ error: 'Failed to fetch songs', details: error.message });
//     }
// };

// module.exports = {
//     getAllSongs
// };