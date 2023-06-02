import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoanCalculator from './Components/LoanCalculator/LoanCalculator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoanCalculator></LoanCalculator>
      </header>
    </div>
  );
}

export default App;
