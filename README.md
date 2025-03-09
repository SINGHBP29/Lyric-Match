# Lyric-Match
![image](https://github.com/user-attachments/assets/7e9f17c1-6af5-4ab1-be22-6d34620bf362)

## Overview
Lyric-Match is a web application that allows users to test their knowledge of song lyrics. Users can generate lyrics, check their answers, and explore a database of songs.

## Features
- **Generate Lyrics:** Get random lyrics from the database.
- **Check Answers:** Validate the song title based on the provided lyrics.
- **Song Library:** Browse and search songs by title.
- **Secure Backend:** Utilizes Express.js, MongoDB, and authentication mechanisms.

## Tech Stack
### **Frontend:**
- React.js

### **Backend:**
- Node.js & Express.js
- Dotenv for environment variable management
- CORS for cross-origin requests

## Installation
### **1. Clone the repository:**
```sh
 git clone https://github.com/SINGHBP29/Lyric-Match.git
 cd Lyric-Match
```

### **2. Setup Backend**
```sh
 cd backend
 npm install
```

### **3. Configure Environment Variables**
Create a `.env` file in the `backend/` directory and add:
```

PORT=5000
TOGETHER_API_KEY=your_api_key
```

### **4. Start Backend Server**
```sh
 npm start
```

### **5. Setup Frontend**
```sh
 cd ../frontend
 npm install
```

### **6. Start Frontend Server**
```sh
 npm start
```

## API Endpoints
### **Lyrics Endpoints**
- `GET /api/lyrics/generate-lysics` - Generates random lyrics.
- `POST /api/lyrics/check-answer` - Validates user input.

### **Songs Endpoints**
- `GET /api/songs` - Fetch all songs.
- `GET /api/songs/random` - Fetch a random song.
- `GET /api/songs/:title` - Fetch song details by title.

## Git Best Practices
- Add `.env` to `.gitignore` to prevent committing secrets.
- Use feature branches for development.
- Follow commit message conventions.

## Contributors
- **Bhanu Pratap Singh** - Developer

## License
This project is licensed under the MIT License.

---
🚀 Happy Coding!
