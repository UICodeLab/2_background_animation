import React from 'react';
import './App.css';

function App() {
  const squares = [];
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 20; col++) {
      const delay = Math.max(row, col) * 0.2;
      squares.push(<div key={`${row}-${col}`} className="grid-square" style={{ animationDelay: `${delay}s` }} />);
    }
  }

  return (
    <div className="App">
      <div className="grid-background">
        {squares}
      </div>
      <div className="centered-text">Background Animation</div>
    </div>
  );
}

export default App;
