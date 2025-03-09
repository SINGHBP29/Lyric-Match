const songMetadata = [
    { title: "Bohemian Rhapsody", author: "Queen" },
    { title: "Imagine", author: "John Lennon" },
    { title: "Hotel California", author: "Eagles" },
    { title: "Sweet Child O' Mine", author: "Guns N' Roses" },
    { title: "Born to Run", author: "Bruce Springsteen" },
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

const getRandomSong = () => songMetadata[Math.floor(Math.random() * songMetadata.length)];
const getSongByTitle = (title) => songMetadata.find(song => song.title === title);

module.exports = { getRandomSong, getSongByTitle };

