import React, {useState} from "react";
import "./Booking.css";
import Counter from "./Counter";
import Calender from './Calender';
import rooms from '../assets/rooms';
import RoomList from './List';

function Booking() {
  let [date, setDate] = useState(new Date());
  let [allocatedDuration, setAllocatedDuration] = useState(30);
  return (
    <div className="Booking-main">
      <div className="Booking-header">
        <div className="Booking-date">
          <Calender value={date} onDateSelected={(date)=>setDate(date)} />
        </div>
        <div className="Booking-counter">
          <Counter count={allocatedDuration} desc={"Allocated minutes"} onChange={(count)=>setAllocatedDuration(count)} />
        </div>
      </div>
      <div className="Booking-content">
          <RoomList items={rooms}/>
      </div>
    </div>
  );
}

export default Booking;
