
import React from 'react';
import './QuoteCard.css'; 

function QuoteCard({ quote, author, liked, toggleLike, fontSize, theme }) {
  return (
    <div className={`quote-card ${theme}`} style={{ fontSize }}>
      <p>"{quote}"</p>
      <p><strong>- {author}</strong></p>
      <button onClick={toggleLike}>
        {liked ? '❤️ Liked' : '🤍 Like'}
      </button>
    </div>
  );
}

export default QuoteCard;
