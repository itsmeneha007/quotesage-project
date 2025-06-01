
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuoteCard from './components/QuoteCard';
import QuoteButton from './components/QuoteButton';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [quote, setQuote] = useState('Self-belief is the first and most important step toward achieving your goals.');
  const [author, setAuthor] = useState('Theodore Roosevelt');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('16px');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://zenquotes.io/api/random');
      const newQuote = {
        q: res.data[0].q,
        a: res.data[0].a,
      };
      setQuote(newQuote.q);
      setAuthor(newQuote.a);
      setLiked(false);
      setLikeCount(0);
      setHistory((prev) => [newQuote, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error('Error fetching quote', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => liked ? prev - 1 : prev + 1);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleFontSize = (e) => {
    setFontSize(e.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${quote}" — ${author}`);
    alert('Quote copied to clipboard!');
  };

  const today = new Date().toLocaleDateString();

  return (
    <div className={`app ${theme}`}>
      <h1>QuoteSage 🧘‍♀️</h1>
      <h3>Your daily dose of wisdom ✨</h3>
      <p className="date">📅 {today}</p>

      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <p>Current Theme: <strong>{theme}</strong></p>

      <label htmlFor="fontSize">Font Size:</label>
      <select id="fontSize" onChange={handleFontSize} value={fontSize}>
        <option value="14px">Small</option>
        <option value="16px">Medium</option>
        <option value="20px">Large</option>
      </select>

      {loading ? (
        <p>Loading quote...</p>
      ) : (
        <QuoteCard
          quote={quote}
          author={author}
          liked={liked}
          toggleLike={toggleLike}
          likeCount={likeCount}
          fontSize={fontSize}
          theme={theme}
        />
      )}

      <div style={{ marginTop: '10px' }}>
        <button onClick={copyToClipboard}>📋 Copy</button>
      </div>

      <QuoteButton fetchQuote={fetchQuote} />

      {history.length > 0 && (
        <div className="history">
          <h4>🕒 Previous Quotes:</h4>
          <ul>
            {history.map((item, idx) => (
              <li key={idx}>
                "{item.q}" — <em>{item.a}</em>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
