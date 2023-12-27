import React, { useState, useEffect } from 'react';
import './App.css';
import { FaHandPaper, FaHandRock, FaHandScissors } from 'react-icons/fa';

const choices = ['rock', 'paper', 'scissors'];

const Player = ({ name = 'player', score = 0, choice }) => {
  const renderIcon = () => {
    if (choice === 'rock') return <FaHandRock size={60} />;
    if (choice === 'paper') return <FaHandPaper size={60} />;
    if (choice === 'scissors') return <FaHandScissors size={60} />;
    return null;
  };

  return (
    <div className="player">
      <div className="score">{`${name}: ${score}`}</div>
      <div className="action">{renderIcon()}</div>
    </div>
  );
};

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return 'Draw';
  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'Player 1 Win';
  } else {
    return 'Computer Win';
  }
}

function App() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameResult, setGameResult] = useState('');

  useEffect(() => {
    if (playerScore === 8) {
      setGameResult('Player 1 wins the game!');
    } else if (computerScore === 8) {
      setGameResult('Computer wins the game!');
    }
  }, [playerScore, computerScore]);

  const handlePlayerChoice = (choice) => {
    if (playerScore === 8 || computerScore === 8) {
      // Game already won, reset the scores
      setPlayerScore(0);
      setComputerScore(0);
      setGameResult('');
    } else {
      setPlayerChoice(choice);

      // Simulate computer's choice
      const randomIndex = Math.floor(Math.random() * choices.length);
      const computerChoice = choices[randomIndex];
      setComputerChoice(computerChoice);

      const result = determineWinner(choice, computerChoice);
      console.log(result);

      // Update scores based on the result
      if (result === 'Player 1 Win') {
        setPlayerScore((prevScore) => prevScore + 1);
      } else if (result === 'Computer Win') {
        setComputerScore((prevScore) => prevScore + 1);
      }
    }
  };

  return (
    <div className="center">
      <h1>Rock Paper Scissors</h1>
      <div>
        <div className="container">
          <Player name="player" score={playerScore} choice={playerChoice} />
          <Player name="computer" score={computerScore} choice={computerChoice} />
        </div>
        <div>
          <button className="round-btn" onClick={() => handlePlayerChoice('rock')}>
            <FaHandRock size={20} />
          </button>
          <button className="round-btn" onClick={() => handlePlayerChoice('paper')}>
            <FaHandPaper size={20} />
          </button>
          <button className="round-btn" onClick={() => handlePlayerChoice('scissors')}>
            <FaHandScissors size={20} />
          </button>
        </div>
        {gameResult ? <h2>{gameResult}</h2> : <h2>{determineWinner(playerChoice, computerChoice)}</h2>}
      </div>
    </div>
  );
}

export default App;
