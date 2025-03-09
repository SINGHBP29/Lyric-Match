

import React, { useState, useEffect } from 'react';
import { Music, Star, RefreshCw, ChevronRight } from 'lucide-react';
import axios from 'axios';
import './App.css';

const LyricGuessingGame = () => {
  const [lyricSnippet, setLyricSnippet] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [result, setResult] = useState(null);
  const [actualSong, setActualSong] = useState('');
  const [actualArtist, setActualArtist] = useState('');
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [songList, setSongList] = useState([]);

  const API_BASE_URL = 'https://lyric-match-vhou.onrender.com/api';

  useEffect(() => {
    fetchSongList();
  }, []);

  const fetchSongList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/songs`);
      setSongList(response.data);
    } catch (error) {
      console.error('Error fetching song list:', error);
    }
  };

  const generateLyricSnippet = async () => {
    setLoading(true);
    setResult(null);
    setUserGuess('');
    setGameStarted(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/generate-lyrics`);
      const data = response.data;
      setLyricSnippet(data.lyricSnippet);
      setActualSong(data.correctTitle);
      const songInfo = songList.find(song => song.title === data.correctTitle);
      setActualArtist(songInfo ? songInfo.author : 'Unknown');
    } catch (error) {
      console.error('Error generating lyrics:', error);
      setLyricSnippet('Error loading lyrics. Please try again.');
    }
    setLoading(false);
  };

  const checkAnswer = async () => {
    if (!userGuess.trim()) return;
    try {
      const response = await axios.post(`${API_BASE_URL}/check-answer`, { guess: userGuess });
      const data = response.data;
      setResult(data.isCorrect);
      setActualSong(data.correctTitle);
      const songInfo = songList.find(song => song.title === data.correctTitle);
      setActualArtist(songInfo ? songInfo.author : 'Unknown');
      if (data.isCorrect) {
        setScore(prev => prev + 1);
        setStreak(prev => prev + 1);
      } else {
        setStreak(0);
      }
    } catch (error) {
      console.error("Error checking answer:", error);
    }
  };

  useEffect(() => {
    if (result === true) {
      document.body.classList.add('celebration');
      setTimeout(() => document.body.classList.remove('celebration'), 1000);
    }
  }, [result]);

  return (
    <div className="lyric-game-container">
      <div className="lyric-game-header">
      <div className="lyric-game-title">
        <Music size={24} />
        <h1><b>Lyric Match</b>- AI-Powered Song Guessing Game
        </h1>
      </div>
      <p className="lyric-game-subtitle">Test your musical expertise</p>
      <div className="lyric-game-stats">
        <div className="lyric-game-score">
        <Star size={16} className="star-icon" />
        <span>{score} points</span>
        </div>
        {streak > 1 && <div className="lyric-game-streak">🔥 {streak} streak</div>}
      </div>
      </div>
      <div className="lyric-game-content">
      {!gameStarted ? (
        <div className="lyric-game-welcome">
        <h2>How Well Do You Know Your Music?</h2>
        <p>Guess the song from just a snippet of lyrics. Score points and challenge yourself!</p>
        <button onClick={generateLyricSnippet} className="lyric-game-start-btn">
          Start Playing <ChevronRight size={18} className="chevron-icon" />
        </button>
        </div>
      ) : (
        <>
        <button onClick={generateLyricSnippet} className="lyric-game-new-btn" disabled={loading}>
          {loading ? <><RefreshCw className="loading-icon" size={18} /> Loading lyrics...</> : <>Get New Lyrics</>}
        </button>
        {lyricSnippet && (
          <div className="lyric-game-play-area">
          <div className="lyric-game-snippet">
                  <p>"{lyricSnippet}"</p>
                </div>
                <div className="lyric-game-guess-area">
                  <input
                    type="text"
                    value={userGuess}
                    onChange={(e) => setUserGuess(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                    placeholder="Enter song title..."
                  />
                  <button onClick={checkAnswer} disabled={!lyricSnippet || !userGuess.trim()} className="lyric-game-submit-btn">
                    Submit Guess
                  </button>
                </div>
                {result !== null && (
                  <div className={`lyric-game-result ${result ? 'correct' : 'incorrect'}`}>
                    {result ? (
                      <>
                        <p className="result-title">Correct! 🎯</p>
                        <p className="result-info"><span>{actualSong}</span> by {actualArtist}</p>
                      </>
                    ) : (
                      <>
                        <p className="result-title">Not quite!</p>
                        <p className="result-info">The song was <span>{actualSong}</span> by {actualArtist}</p>
                      </>
                    )}
                  </div>
                )}
                {result !== null && (
                  <button onClick={generateLyricSnippet} className="lyric-game-next-btn">
                    <RefreshCw size={16} /> Next Challenge
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LyricGuessingGame;
