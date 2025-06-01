
import React from 'react';
import './QuoteButton.css'; 

function QuoteButton({ fetchQuote }) {
  return (
    <button className="quote-button" onClick={fetchQuote}>
      🔁 New Quote
    </button>
  );
}

export default QuoteButton;

