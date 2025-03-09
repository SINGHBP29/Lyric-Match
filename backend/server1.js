const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { Together } = require('together-ai');

dotenv.config();
console.log("Together API Key exists:", !!process.env.TOGETHER_API_KEY);

const app = express();
const port = process.env.PORT || 5000;

// Initialize Together client
const together = new Together(process.env.TOGETHER_API_KEY);

// Song metadata - at least 20 popular songs with authors
const songMetadata = [
    { title: "Bohemian Rhapsody", author: "Queen" },
    { title: "Imagine", author: "John Lennon" },
    { title: "Hotel California", author: "Eagles" },
    { title: "Sweet Child O' Mine", author: "Guns N' Roses" },
    { title: "Smells Like Teen Spirit", author: "Nirvana" },
    { title: "Billie Jean", author: "Michael Jackson" },
    { title: "Hey Jude", author: "The Beatles" },
    { title: "Like a Rolling Stone", author: "Bob Dylan" },
    { title: "Stairway to Heaven", author: "Led Zeppelin" },
    { title: "Yesterday", author: "The Beatles" },
    { title: "Wonderwall", author: "Oasis" },
    { title: "Purple Haze", author: "Jimi Hendrix" },
    { title: "Shape of You", author: "Ed Sheeran" },
    { title: "Thriller", author: "Michael Jackson" },
    { title: "Sweet Caroline", author: "Neil Diamond" },
    { title: "Piano Man", author: "Billy Joel" },
    { title: "I Will Always Love You", author: "Whitney Houston" },
    { title: "Livin' on a Prayer", author: "Bon Jovi" },
    { title: "Don't Stop Believin'", author: "Journey" },
    { title: "Wannabe", author: "Spice Girls" },
    { title: "Dancing Queen", author: "ABBA" },
    { title: "Born to Run", author: "Bruce Springsteen" },
    { title: "Respect", author: "Aretha Franklin" },
    { title: "Hallelujah", author: "Leonard Cohen" },
    { title: "Uptown Funk", author: "Mark Ronson ft. Bruno Mars" }
];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Song list
const songs = songMetadata.map(song => song.title);

// Store currentSongTitle as a variable at module scope
let currentSongTitle = '';

const generateFallbackLyrics = () => {
  // Sample lyrics for fallback
  const fallbackLyrics = [
    { snippet: "I've been dancing with the devil, got a secret that nobody knows", song: "Midnight Rain", artist: "Taylor Swift" },
    { snippet: "All I think about is karma, and then the world goes dark", song: "Cruel Summer", artist: "Taylor Swift" },
    { snippet: "So we took the midnight train going anywhere", song: "Don't Stop Believin'", artist: "Journey" },
    { snippet: "Do you recall, not long ago, we would walk on the sidewalk", song: "Blinding Lights", artist: "The Weeknd" },
    { snippet: "I've been running through the jungle, I've been running with the wolves", song: "Wolves", author: "Selena Gomez" },
    { snippet: "Is this the real life? Is this just fantasy?", song: "Bohemian Rhapsody", artist: "Queen" },
    { snippet: "Imagine there's no heaven, it's easy if you try", song: "Imagine", artist: "John Lennon" },
    { snippet: "On a dark desert highway, cool wind in my hair", song: "Hotel California", artist: "Eagles" },
    { snippet: "She's got a smile that it seems to me, reminds me of childhood memories", song: "Sweet Child O' Mine", artist: "Guns N' Roses" },
    { snippet: "Load up on guns, bring your friends, it's fun to lose and to pretend", song: "Smells Like Teen Spirit", artist: "Nirvana" }
  ];
  
  return fallbackLyrics[Math.floor(Math.random() * fallbackLyrics.length)];
};

// Function to query Together AI API
async function queryTogetherAPI(prompt) {
  try {
    if (!process.env.TOGETHER_API_KEY) {
      throw new Error('Together API key is missing');
    }

    const response = await together.chat.completions.create({
      messages: [
        {
          "role": "user",
          "content": prompt
        }
      ],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      max_tokens: 100, // Limit to short responses for lyrics snippets
      repetition_penalty: 1,
      stop: ["<|eot_id|>", "<|eom_id|>"]
    });

    // Extract the generated text
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Together API error:', error.message);
    throw error;
  }
}

// API endpoint to generate lyrics using Together AI
app.get('/api/generate-lyrics', async (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * songs.length);
    currentSongTitle = songs[randomIndex]; // Set the current song title

    try {
      // Use Together AI API
      const prompt = `Generate a 2-4 line snippet of lyrics from the song "${currentSongTitle}".
      The snippet should be recognizable but not too obvious.
      DO NOT include the title of the song in the lyrics.
      DO NOT mention the song title, artist name, or any obvious reference to the song title.
      Only return the lyric snippet, nothing else.`;

      // Call Together AI API function
      const lyricSnippet = await queryTogetherAPI(prompt);
      
      // Find the artist for this song
      const songInfo = songMetadata.find(song => song.title === currentSongTitle);
      const artist = songInfo ? songInfo.author : "Unknown Artist";
      
      res.json({ 
        lyricSnippet,
        song: currentSongTitle,
        artist: artist
      });
    } catch (apiError) {
      console.warn('Together API failed, using fallback lyrics:', apiError.message);
      
      // Use fallback lyrics
      const fallback = generateFallbackLyrics();
      currentSongTitle = fallback.song;
      
      res.json({
        lyricSnippet: fallback.snippet,
        song: fallback.song,
        artist: fallback.artist
      });
    }
  } catch (error) {
    console.error('Error generating lyrics:', error.message);
    res.status(500).json({ error: 'Failed to generate lyrics', details: error.message });
  }
});

// API endpoint to check the user's answer
app.post('/api/check-answer', (req, res) => {
  try {
    const { guess } = req.body;
    
    if (!currentSongTitle) {
      return res.status(400).json({ error: 'No active song. Generate lyrics first.' });
    }

    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedCorrect = currentSongTitle.toLowerCase();
    const isCorrect = normalizedGuess === normalizedCorrect || 
                      normalizedCorrect.includes(normalizedGuess) || 
                      normalizedGuess.includes(normalizedCorrect);

    // Find the artist for this song
    const songInfo = songMetadata.find(song => song.title === currentSongTitle);
    const artist = songInfo ? songInfo.author : "Unknown Artist";

    res.json({
      isCorrect,
      correctTitle: currentSongTitle,
      artist: artist,
      userGuess: guess
    });
  } catch (error) {
    console.error('Error checking answer:', error.message);
    res.status(500).json({ error: 'Failed to check answer', details: error.message });
  }
});

// API endpoint to get the list of songs
app.get('/api/songs', (req, res) => {
    res.json(songMetadata);
});

// Suggest a song based on user input
app.post('/api/suggest-songs', async (req, res) => {
  try {
    const { lyrics } = req.body;
    
    if (!lyrics || lyrics.trim() === '') {
      return res.status(400).json({ error: 'No lyrics provided' });
    }
    
    try {
      const prompt = `Based on these lyrics: "${lyrics}", suggest 5 similar songs that have a similar theme, mood, or style. For each song, provide the title and artist name in a simple format. Only include the list of songs, no other explanations.`;
      
      const suggestionsText = await queryTogetherAPI(prompt);
      
      // Parse the suggestions into a structured format
      const suggestionLines = suggestionsText.split('\n').filter(line => line.trim() !== '');
      const suggestions = suggestionLines.map(line => {
        // Try to extract title and artist
        const match = line.match(/[0-9\.\s]*(.+)(?:by|-)(.+)/i);
        if (match) {
          return {
            title: match[1].trim().replace(/["']/g, ''),
            artist: match[2].trim().replace(/["']/g, '')
          };
        } else {
          return { 
            raw: line.replace(/[0-9\.\s]*/g, '').trim() 
          };
        }
      });
      
      res.json({ suggestions });
    } catch (apiError) {
      console.warn('Together API failed for song suggestions:', apiError.message);
      res.status(500).json({ error: 'Failed to generate song suggestions', details: apiError.message });
    }
  } catch (error) {
    console.error('Error suggesting songs:', error.message);
    res.status(500).json({ error: 'Failed to suggest songs', details: error.message });
  }
});

// Server startup
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Using Together AI model: meta-llama/Llama-3.3-70B-Instruct-Turbo`);
  console.log(`Together API key configured: ${process.env.TOGETHER_API_KEY ? 'Yes' : 'No'}`);
});