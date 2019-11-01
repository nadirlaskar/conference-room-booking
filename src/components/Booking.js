import React, { useState } from "react";
import "./Booking.css";
import Counter from "./Counter";
import Calender from "./Calender";
import rooms from "../assets/rooms";
import RoomList from "./List";
import TimeLineList from "./List";
import TimeLine from "./TimeLine";
import TimeSlider from "./TimeSlider";

function getbookings(date) {
  let item = localStorage.getItem(date);
  if (item) return JSON.parse(item);
  else {
    debugger;
    return rooms.reduce((b, r, i) => {
      b[r.name] = {
        username: "demo",
        date,
        startTime: "17:30",
        allocatedDuration: 30,
        reason: "Meeting"
      };
      return b;
    }, {});
  }
}

function Booking() {
  let [date, setDate] = useState(new Date());
  let [allocatedDuration, setAllocatedDuration] = useState(30);
  let [selectedRoom, setSelectedRoom] = useState(0);
  let [selectedTime, setSelectedTime] = useState("");
  let [position,setPosition] = useState(-1);

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
          <TimeSlider
            onSelect={time => {
              setSelectedTime(time);
            }}
            selectedTime={selectedTime}
            allocatedDuration={allocatedDuration}
            onScroll={position=>setPosition(position)}
          >
            <TimeLineList
              items={rooms}
              data={{ selectedTime, bookings: getbookings(date), position }}
              ItemRenderer={TimeLine}
            />
          </TimeSlider>
        </div>
      </div>
    </div>
  );
}

export default Booking;
