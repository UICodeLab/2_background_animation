import React from 'react';
import './App.css';

function App() {
  const colors = [
    '#FEDDEE', '#27ECFC', '#FFCF52', '#FF63B0',
    '#EBF9E5', '#6AA6F9', '#FFF2D0', '#7AF8CB',
    '#26C2FA', '#F33EE7', '#FAD16A', '#FF844E',
    '#07D2FB', '#3E4FEC', '#FECEF7', '#0066F4',
    '#FDFF97', '#FD91E4', '#FFE926', '#F948DD'
  ];

  const lines = Array.from({ length: 100 }, (_, index) => {
    const randomDelay = Math.random() * 10;
    const marginLeft = `${(index - 50) * 1}%`;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
    const randomWidth = Math.random() * 5;
    return (
      <div
        className="line"
        key={index}
        style={{
          marginLeft: marginLeft,
          width: `${randomWidth}px`,
          '--animation-delay': `${randomDelay}s`,
          '--gradient-color': randomColor,
          '--gradient-color2': randomColor2,
        }}
      >
      </div>
    );
  });

  return (<div>
    <div className="lines">{lines}</div>
    <h1 className='centered-title'>Background Animation</h1>
  </div>)
}

export default App;