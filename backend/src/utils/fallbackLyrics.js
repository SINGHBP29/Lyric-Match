const fallbackLyrics = [
    { snippet: "I've been dancing with the devil, got a secret that nobody knows", song: "Midnight Rain", artist: "Taylor Swift" },
    { snippet: "On a dark desert highway, cool wind in my hair", song: "Hotel California", artist: "Eagles" },
    { snippet: "Imagine there's no heaven, it's easy if you try", song: "Imagine", artist: "John Lennon" },
    { snippet: "All I think about is karma, and then the world goes dark", song: "Cruel Summer", artist: "Taylor Swift" },
    { snippet: "So we took the midnight train going anywhere", song: "Don't Stop Believin'", artist: "Journey" },
    { snippet: "Do you recall, not long ago, we would walk on the sidewalk", song: "Blinding Lights", artist: "The Weeknd" },
    { snippet: "I've been running through the jungle, I've been running with the wolves", song: "Wolves", artist: "Selena Gomez" },
    { snippet: "Is this the real life? Is this just fantasy?", song: "Bohemian Rhapsody", artist: "Queen" }
];

const getFallbackLyrics = () => fallbackLyrics[Math.floor(Math.random() * fallbackLyrics.length)];

module.exports = { getFallbackLyrics };

