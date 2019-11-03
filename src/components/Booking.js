import React, { useState } from "react";
import "./Booking.css";
import Counter from "./Counter";
import Calender from "./Calender";
import rooms from "../assets/rooms";
import RoomList from "./List";
import TimeLineList from "./List";
import TimeLine from "./TimeLine";
import TimeSlider from "./TimeSlider";
import Dialog from "./Dialog";
let demo = null;
function getbookings(date) {
  let item = localStorage.getItem(date);
  if (item) return JSON.parse(item);
  else {
    demo = demo==null?rooms.reduce((b, r, i) => {
      b[r.name] = [{
        username: "demo",
        date,
        startTime: `0${Math.floor(((Math.random()*17)+1))}:${Math.floor(((Math.random()*50)))}`,
        allocatedDuration: Math.floor(((Math.random()*30)+30)),
        reason: "Meeting"
      }];
      return b;
    }, {}):demo;
    return demo;
  }
}

function bookSlot(selectedRoom,username='demo',date,startTime,allocatedDuration,reason){
  let item = JSON.parse(localStorage.getItem(date.toDateString()));
  if(!item) item = {};
  let room = item[rooms[selectedRoom].name];
  if(!room) {
    room=[]
    item[rooms[selectedRoom].name]=room;
  }
  room.push({
    username,
    date,
    startTime,
    allocatedDuration,
    reason
  })
  localStorage.setItem(date.toDateString(),JSON.stringify(item))
}

function Booking() {
  let [date, setDate] = useState(new Date());
  let [allocatedDuration, setAllocatedDuration] = useState(30);
  let [selectedRoom, setSelectedRoom] = useState(0);
  let [selectedTime, setSelectedTime] = useState("");
  let [position, setPosition] = useState(-1);
  let [isDialogOpen, setIsDialogOpen] = useState(false);
  let [reason, setReason] = useState("");

  return (
    <div className="Booking-main">
      <div className="Booking-header">
        <div className="Booking-date">
          <Calender value={date} onDateSelected={date => setDate(date)} />
        </div>
        <div className="Booking-counter">
          <Counter
            min={30}
            max={60*24}
            step={5}
            count={allocatedDuration}
            desc={"Allocated minutes"}
            onChange={count => setAllocatedDuration(count)}
          />
        </div>
        <div
          className={`Booking-button ${selectedTime===""?' disabled':''}`}
          onClick={() => setIsDialogOpen(true&&selectedTime!=="")}
        >
          Book Slot
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
            onScroll={position => setPosition(position)}
          >
            <TimeLineList
              items={rooms}
              data={{ selectedTime, bookings: getbookings(date.toDateString()), position }}
              ItemRenderer={TimeLine}
            />
          </TimeSlider>
        </div>
      </div>
      <Dialog
        open={isDialogOpen}
        message={`Do you want to book ${
          rooms[selectedRoom].name
        } on ${date.toDateString()} at ${selectedTime}hrs for ${allocatedDuration} mins ?`}
        content={
          <div className="Booking-form">
            <form>
              <fieldset>
                <legend>Why are you booking the slot ?</legend>
                <textarea
                  name="reason"
                  placeholder={"Add your reason here"}
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                ></textarea>
              </fieldset>
            </form>
          </div>
        }
        footer={
          <div
            className={`Booking-button${reason===''?' disabled':''}`}
            onClick={() => {
              bookSlot(selectedRoom,'demo',date,selectedTime,allocatedDuration,reason);
              setSelectedTime('');
              setDate(new Date())
              setIsDialogOpen(false)
            }}
          >
            Confirm
          </div>
        }
        onCancle={() => {
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}

export default Booking;
