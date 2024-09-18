import './App.css';
import { useState } from "react";

function App() {
  const [turn, setTurn] = useState("X");
  const [boxes, setBoxes] = useState(Array(9).fill(" "));
  const [winStatus, setWinStatus] = useState("");

  const checkWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5], 
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (boxes[a] === boxes[b] && boxes[a] === boxes[c] && boxes[a] !== " ") {
        setWinStatus(`${boxes[a]} won`);
        return;
      }
    }

    // Check for draw
    if (boxes.every(box => box !== " ")) {
      setWinStatus("It's a draw");
    }
  };

  const makeMove = (index) => {
    if (boxes[index] !== " " || winStatus) return;
    const newBoxes = [...boxes];
    newBoxes[index] = turn;
    setBoxes(newBoxes);
    checkWin();
    setTurn(turn === "X" ? "O" : "X");
  };

  return (
    <div className="App">
      <h1>TIC-TAC-TOE</h1>
      <div>Current turn: {turn}</div>
      <div>{winStatus}</div>
      <div id='main_board'>
        {boxes.map((box, index) => (
          <span
            key={index}
            onClick={() => makeMove(index)}
            className='box'
          >
            {box}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
