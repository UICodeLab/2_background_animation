import React from 'react';
import './App.css';

const App = () => {
  const gridColumns = 15;
  const gridRows = 10;
  const centerX = Math.floor(gridColumns / 2);
  const centerY = Math.floor(gridRows / 2);
  const colors = ['#4A46FF', '#4A8FEF', '#4ADEDE', '#A297E5', '#FF4DED'];

  return (
    <div className="app">
      <div className="perspective-container">
        <div className="grid">
          {Array.from({ length: gridColumns * gridRows }).map((_, index) => {
            const x = index % gridColumns;
            const y = Math.floor(index / gridColumns);

            const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

            return (
              <div
                key={index}
                className="blue-square"
                style={{
                  '--animation-delay': `${distance * 0.2}s`,
                  backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                }}
              />
            );
          })}
        </div>
      </div>
      <h1 style={{position:'absolute', top:'30%', left:'10%', color:'white'}}>Background Animation</h1>
    </div>
  );
};

export default App;
