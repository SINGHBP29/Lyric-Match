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

// // src/controllers/lyricsController.js
// const apiService = require('../services/apiService');
// const songService = require('../services/songService');
// const fallbackLyrics = require('../utils/fallbackLyrics');

// // Store current song info
// let currentSong = null;

// // Generate lyrics
// const generateLyrics = async (req, res) => {
//     try {
//         // Get a random song
//         const song = songService.getRandomSong();
//         currentSong = song;

//         try {
//             // Use Together AI API
//             const prompt = `Generate a 2-4 line snippet of lyrics from the song "${song.title}".
//             The snippet should be recognizable but not too obvious.
//             DO NOT include the title of the song in the lyrics.
//             DO NOT mention the song title, artist name, or any obvious reference to the song title.
//             Only return the lyric snippet, nothing else.`;

//             // Call Together AI API
//             const lyricSnippet = await apiService.queryTogetherAPI(prompt);
            
//             res.json({ 
//                 lyricSnippet,
//                 song: song.title,
//                 artist: song.author
//             });
//         } catch (apiError) {
//             console.warn('Together API failed, using fallback lyrics:', apiError.message);
            
//             // Use fallback lyrics
//             const fallback = fallbackLyrics.getRandomFallbackLyric();
//             currentSong = { title: fallback.song, author: fallback.artist };
            
//             res.json({
//                 lyricSnippet: fallback.snippet,
//                 song: fallback.song,
//                 artist: fallback.artist
//             });
//         }
//     } catch (error) {
//         console.error('Error generating lyrics:', error.message);
//         res.status(500).json({ error: 'Failed to generate lyrics', details: error.message });
//     }
// };

// // Check answer
// const checkAnswer = (req, res) => {
//     try {
//         const { guess } = req.body;
        
//         if (!currentSong) {
//             return res.status(400).json({ error: 'No active song. Generate lyrics first.' });
//         }

//         const normalizedGuess = guess.trim().toLowerCase();
//         const normalizedCorrect = currentSong.title.toLowerCase();
//         const isCorrect = normalizedGuess === normalizedCorrect || 
//                           normalizedCorrect.includes(normalizedGuess) || 
//                           normalizedGuess.includes(normalizedCorrect);

//         res.json({
//             isCorrect,
//             correctTitle: currentSong.title,
//             artist: currentSong.author,
//             userGuess: guess
//         });
//     } catch (error) {
//         console.error('Error checking answer:', error.message);
//         res.status(500).json({ error: 'Failed to check answer', details: error.message });
//     }
// };

// // Suggest songs based on lyrics
// const suggestSongs = async (req, res) => {
//     try {
//         const { lyrics } = req.body;
        
//         if (!lyrics || lyrics.trim() === '') {
//             return res.status(400).json({ error: 'No lyrics provided' });
//         }
        
//         try {
//             const prompt = `Based on these lyrics: "${lyrics}", suggest 5 similar songs that have a similar theme, mood, or style. For each song, provide the title and artist name in a simple format. Only include the list of songs, no other explanations.`;
            
//             const suggestionsText = await apiService.queryTogetherAPI(prompt);
            
//             // Parse the suggestions into a structured format
//             const suggestionLines = suggestionsText.split('\n').filter(line => line.trim() !== '');
//             const suggestions = suggestionLines.map(line => {
//                 // Try to extract title and artist
//                 const match = line.match(/[0-9\.\s]*(.+)(?:by|-)(.+)/i);
//                 if (match) {
//                     return {
//                         title: match[1].trim().replace(/["']/g, ''),
//                         artist: match[2].trim().replace(/["']/g, '')
//                     };
//                 } else {
//                     return { 
//                         raw: line.replace(/[0-9\.\s]*/g, '').trim() 
//                     };
//                 }
//             });
            
//             res.json({ suggestions });
//         } catch (apiError) {
//             console.warn('Together API failed for song suggestions:', apiError.message);
//             res.status(500).json({ error: 'Failed to generate song suggestions', details: apiError.message });
//         }
//     } catch (error) {
//         console.error('Error suggesting songs:', error.message);
//         res.status(500).json({ error: 'Failed to suggest songs', details: error.message });
//     }
// };

// module.exports = {
//     generateLyrics,
//     checkAnswer,
//     suggestSongs
// };
