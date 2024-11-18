import './App.css';

function App() {
  const gradients = [
    "linear-gradient(90deg, #FEDDEE, #27ECFC)",
    "linear-gradient(90deg, #FFCF52, #FF63B0, #EE8DFF)",
    "linear-gradient(90deg, #EBF9E5, #6AA6F9)",
    "linear-gradient(90deg, #FFF2D0, #7AF8CB)",
    "linear-gradient(90deg, #26C2FA, #F33EE7)",
    "linear-gradient(90deg, #FAD16A, #FF844E)",
    "linear-gradient(90deg, #07D2FB, #3E4FEC)",
    "linear-gradient(90deg, #FECEF7, #0066F4)",
    "linear-gradient(90deg, #FDFF97, #FD91E4, #0028F9)",
    "linear-gradient(90deg, #FFE926, #F948DD)"
  ];

  const getRandomGradient = () => gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <div className="App">
      <div className="light"></div>
      <h1 className="centered-text">Background Animation</h1>
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          style={{
            filter: 'blur(1px)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {[...Array(8)].map((_, j) => (
            <div
              key={`${i}-${j}`}
              className="ray"
              style={{
                transform: `rotate(${i * 12 + Math.random() * 10}deg) translateX(${Math.random() * 100 + j * 30}px)`,
                background: getRandomGradient(),
                opacity: 1 - j * 0.1,
                animation: `fadeOut ${Math.random()*4+2}s linear ${(Math.random()*10) * 0.5 * j}s infinite`
              }}
            ></div>
          ))}
        </div>
      ))}
      <div className="light2"></div>
    </div>
  );
}

export default App;
