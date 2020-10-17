import React from 'react';
import logo from './logo.svg';
import './App.css';
import RaidBracket from './components/RaidBracket.js'
import SiteHeader from './components/SiteHeader.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SiteHeader/>
        <RaidBracket/>
      </header>
    </div>
  );
}

export default App;
