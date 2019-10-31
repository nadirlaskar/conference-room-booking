import React from 'react';
import './Booking.css';
import Counter from './Counter';

function Header() {
  return (
     <div className="Booking-main">
       <div className="Booking-header">
         <div className="Booking-counter">
            <Counter count={"100"} desc={"Allocated minutes"}/>
         </div>
       </div>
       <div className="Booking-content"></div>
     </div>
  );
}

export default Header;
