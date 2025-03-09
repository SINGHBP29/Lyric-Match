const songMetadata = [
    { title: "Bohemian Rhapsody", author: "Queen" },
    { title: "Imagine", author: "John Lennon" },
    { title: "Hotel California", author: "Eagles" },
    { title: "Sweet Child O' Mine", author: "Guns N' Roses" },
    { title: "Born to Run", author: "Bruce Springsteen" }
];

const getRandomSong = () => songMetadata[Math.floor(Math.random() * songMetadata.length)];
const getSongByTitle = (title) => songMetadata.find(song => song.title === title);

module.exports = { getRandomSong, getSongByTitle };


// // src/services/songService.js
// // Song metadata
// const songMetadata = [
//     { title: "Bohemian Rhapsody", author: "Queen" },
//     { title: "Imagine", author: "John Lennon" },
//     { title: "Hotel California", author: "Eagles" },
//     { title: "Sweet Child O' Mine", author: "Guns N' Roses" },
//     { title: "Smells Like Teen Spirit", author: "Nirvana" },
//     { title: "Billie Jean", author: "Michael Jackson" },
//     { title: "Hey Jude", author: "The Beatles" },
//     { title: "Like a Rolling Stone", author: "Bob Dylan" },
//     { title: "Stairway to Heaven", author: "Led Zeppelin" },
//     { title: "Yesterday", author: "The Beatles" },
//     { title: "Wonderwall", author: "Oasis" },
//     { title: "Purple Haze", author: "Jimi Hendrix" },
//     { title: "Shape of You", author: "Ed Sheeran" },
//     { title: "Thriller", author: "Michael Jackson" },
//     { title: "Sweet Caroline", author: "Neil Diamond" },
//     { title: "Piano Man", author: "Billy Joel" },
//     { title: "I Will Always Love You", author: "Whitney Houston" },
//     { title: "Livin' on a Prayer", author: "Bon Jovi" },
//     { title: "Don't Stop Believin'", author: "Journey" },
//     { title: "Wannabe", author: "Spice Girls" },
//     { title: "Dancing Queen", author: "ABBA" },
//     { title: "Born to Run", author: "Bruce Springsteen" },
//     { title: "Respect", author: "Aretha Franklin" },
//     { title: "Hallelujah", author: "Leonard Cohen" },
//     { title: "Uptown Funk", author: "Mark Ronson ft. Bruno Mars" }
// ];

// // Get all songs
// const getAllSongs = () => {
//     return songMetadata;
// };

// // Get random song
// const getRandomSong = () => {
//     const randomIndex = Math.floor(Math.random() * songMetadata.length);
//     return songMetadata[randomIndex];
// };

// // Get song by title
// const getSongByTitle = (title) => {
//     return songMetadata.find(song => 
//         song.title.toLowerCase() === title.toLowerCase()
//     );
// };

// module.exports = {
//     getAllSongs,
//     getRandomSong,
//     getSongByTitle
// };