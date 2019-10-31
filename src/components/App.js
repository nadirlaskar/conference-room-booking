import React from 'react';
import './App.css';
import Header from './Header';
import Booking  from './Booking';

function App() {
  return (
    <div className="App-main">
      <Header/>
      <div className="App-content">
          <Booking/>
      </div>
    </div>
  );
}

export default App;
