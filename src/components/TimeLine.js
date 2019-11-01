import React, { useState, useRef, useEffect } from "react";
import "./TimeLine.css";

function TimeLine({id, item, data}){
    let { bookings, selectedTime, position } =  data;
    let maxTime = 26*60, minTime = 0, step=5;
    let blocks = [];

    const el = useRef(null);

    useEffect(()=>{
        el.current.scrollLeft=position-357-276;
    });

    let hashMap = bookings[item.name]?bookings[item.name].reduce((map,booking)=>{
        let [hr,min] = booking.startTime.split(':').map(x=>parseInt(x));
        for(let i=0;i<booking.allocatedDuration;i++){
            let book = {...booking};
            if(i===0) book.start=true;
            else if(i===book.allocatedDuration-1) book.end=true;
            map[(hr*60+min)+i]=book;
        }
        return map;
    },{}):{}

  for(let i=0;i<maxTime;i+=step){
    let isBooked = hashMap[i]?hashMap[i]:false;
    blocks.push(<div key={i} id={i} 
        title={isBooked?`This slot is booked by ${isBooked.username}, from ${isBooked.startTime} for ${isBooked.allocatedDuration}mins.\nReason : ${isBooked.reason}`:'Slot available for booking'}
        className={`TimeLine-cell${isBooked?" TimeLine-cell-booked":''}${isBooked&&(isBooked.start||isBooked.end)?' TimeLine-cell-booked-edge':''}`}></div>)
  }

    return (<div className="TimeLine-main" ref={el}>
        {blocks}
    </div>)
}

export default TimeLine;