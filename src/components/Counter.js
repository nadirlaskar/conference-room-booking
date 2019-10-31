import React from 'react';
import './Counter.css';

function Counter({count, desc}){
  return(
    <div className="Counter-wrapper">
      <div className="Counter-box Counter-button">-</div>
      <div className="Counter-box">{count}</div>
      <div className="Counter-box Counter-button">+</div>
      <div className="Counter-desc">{desc}</div>
    </div>
  );
}

export default Counter;