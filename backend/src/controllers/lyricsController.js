const { queryTogetherAPI } = require('../services/apiServices');
const { getRandomSong, getSongByTitle } = require('../services/songService');
const { getFallbackLyrics } = require('../utils/fallbackLyrics');

let currentSongTitle = '';

async function generateLyrics(req, res) {
    try {
        const song = getRandomSong();
        currentSongTitle = song.title;

        try {
            const prompt = `Generate a 2-4 line snippet of lyrics from the song "${currentSongTitle}".`;
            const lyricSnippet = await queryTogetherAPI(prompt);
            res.json({ lyricSnippet, song: song.title, artist: song.author });
        } catch (apiError) {
            const fallback = getFallbackLyrics();
            res.json({ lyricSnippet: fallback.snippet, song: fallback.song, artist: fallback.artist });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate lyrics' });
    }
}

function checkAnswer(req, res) {
    const { guess } = req.body;
    if (!currentSongTitle) return res.status(400).json({ error: 'No active song. Generate lyrics first.' });

    const song = getSongByTitle(currentSongTitle);
    const isCorrect = guess.toLowerCase() === currentSongTitle.toLowerCase();

    res.json({ isCorrect, correctTitle: song.title, artist: song.author, userGuess: guess });
}

module.exports = { generateLyrics, checkAnswer };

