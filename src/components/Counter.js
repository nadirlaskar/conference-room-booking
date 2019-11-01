import React from 'react';
import './Counter.css';

function Counter({count, desc, onChange, step=1, min=0,max=60}){
  return(
    <div className="Counter-wrapper">
      <div className="Counter-box Counter-button" onClick={()=>{
          if(count-step>=min) onChange(count-step);
          else onChange(min);
        }}>-</div>
      <div className="Counter-box">{count}</div>
      <div className="Counter-box Counter-button"  onClick={()=>{
          if(count+step<=max) onChange(count+step)
          else onChange(max);
        }}>+</div>
      <div className="Counter-desc">{desc}</div>
    </div>
  );
}

export default Counter;