# 🎵 Lyric-Match
![Lyric-Match](https://github.com/user-attachments/assets/7e9f17c1-6af5-4ab1-be22-6d34620bf362)

## 🌟 Overview
**Lyric-Match** is a web application that tests your knowledge of song lyrics. Users can generate random lyrics, verify their answers, and explore a vast song library. Whether you're a music lover or just up for a fun challenge, Lyric-Match is the perfect way to engage with your favorite tunes! 🎤🎶

## 🚀 Live Demo
[**Try Lyric-Match Now!**]([https://lyric-match-8765.onrender.com](https://lyric-match-8765.onrender.com))

## ✨ Features
✅ **Generate Lyrics:** Get random lyrics from our database.  
✅ **Check Answers:** Verify the song title based on the provided lyrics.  
✅ **Song Library:** Browse and search for songs by title.  
✅ **Secure Backend:** Built with **Node.js, Express.js, MongoDB**, and authentication mechanisms.  
✅ **Modern UI:** Developed using **React.js** for a seamless experience.

---

## 🛠 Tech Stack
### 🎨 **Frontend:**
- React.js
- Axios for API requests
- Tailwind CSS (for styling)

### 🖥 **Backend:**
- Node.js & Express.js
- Dotenv (Environment Variable Management)
- CORS (Cross-Origin Requests)

---

## ⚙️ Installation Guide
### **1️⃣ Clone the Repository**
```sh
 git clone https://github.com/SINGHBP29/Lyric-Match.git
 cd Lyric-Match
```

### **2️⃣ Setup Backend**
```sh
 cd backend
 npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file inside the `backend/` directory and add:
```ini
PORT=5000
TOGETHER_API_KEY=your_api_key
```

### **4️⃣ Start Backend Server**
```sh
 npm start
```

### **5️⃣ Setup Frontend**
```sh
 cd ../frontend
 npm install
```

### **6️⃣ Start Frontend Server**
```sh
 npm start
```

---

## 🔌 API Endpoints
### 🎵 **Lyrics Endpoints**
- `GET /api/lyrics/generate-lyrics` → Generates random lyrics.
- `POST /api/lyrics/check-answer` → Validates user input.

### 🎼 **Songs Endpoints**
- `GET /api/songs` → Fetch all songs.
- `GET /api/songs/random` → Fetch a random song.
- `GET /api/songs/:title` → Fetch song details by title.

---

## 📌 Git Best Practices
✅ Add `.env` to `.gitignore` to prevent committing secrets.  
✅ Use **feature branches** for development.  
✅ Follow **clear commit message conventions** (e.g., `feat: added new lyrics API`).  

---

## 👥 Contributors
- **Bhanu Pratap Singh** - Developer 🧑‍💻

---

## 📜 License
This project is licensed under the **MIT License**.

🎧 _Enjoy playing with lyrics!_ 🚀
