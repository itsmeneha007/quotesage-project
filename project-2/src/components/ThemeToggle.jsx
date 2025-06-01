

import React from 'react';
import './ThemeToggle.css';

function ThemeToggle({ theme, toggleTheme }) {
  const isLight = theme === 'light';
  const label = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
  const buttonClass = `theme-toggle-button ${theme}`;

  return (
    <button
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={buttonClass}
    >
      {isLight ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}

export default ThemeToggle;

