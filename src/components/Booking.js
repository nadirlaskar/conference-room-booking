import React, { useState } from "react";
import "./Booking.css";
import Counter from "./Counter";
import Calender from "./Calender";
import rooms from "../assets/rooms";
import RoomList from "./List";
import TimeLineList from "./List";
import TimeLine from "./TimeLine";
import TimeSlider  from './TimeSlider';

function Booking() {
  let [date, setDate] = useState(new Date());
  let [allocatedDuration, setAllocatedDuration] = useState(30);
  let [selectedRoom, setSelectedRoom] = useState(0);
  let [selectedTime, setSelectedTime] = useState('');
  return (
    <div className="Booking-main">
      <div className="Booking-header">
        <div className="Booking-date">
          <Calender value={date} onDateSelected={date => setDate(date)} />
        </div>
        <div className="Booking-counter">
          <Counter
            step={5}
            count={allocatedDuration}
            desc={"Allocated minutes"}
            onChange={count => setAllocatedDuration(count)}
          />
        </div>
      </div>
      <div className="Booking-content">
        <div className="Booking-room-names">
          <RoomList
            items={rooms}
            selected={selectedRoom}
            onSelect={selectedRoom => setSelectedRoom(selectedRoom)}
          />
        </div>
        <div className="Booking-room-times">
          <TimeSlider onSelect={(time)=>{setSelectedTime(time)}} selectedTime={selectedTime} 
              allocatedDuration={allocatedDuration}>
            <TimeLineList items={rooms} data={{selectedTime}} ItemRenderer={TimeLine} />
          </TimeSlider>
        </div>
      </div>
    </div>
  );
}

export default Booking;
