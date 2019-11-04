import React, { useState, useRef, useEffect } from "react";
import "./TimeLine.css";

function TimeLine({id, item, data}){
    let { bookings, selectedTime, position, onDelete=()=>{} } =  data;
    let maxTime = 18*60, minTime = 9*60, step=5;
    let blocks = [];

    const el = useRef(null);

    useEffect(()=>{
        if(el.current.scrollTo){
            el.current.scrollTo({left:position, behaviour:'smooth'})
        }else el.current.scrollLeft=position;
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

  for(let i=minTime;i<maxTime;i+=step){
    let isBooked = hashMap[i]?hashMap[i]:false;
    blocks.push(
        <div className="TimeLine-cell-action-wrapper">
            <div key={i} id={i} 
                title={isBooked?`This slot is booked by ${isBooked.username}, from ${isBooked.startTime} for ${isBooked.allocatedDuration}mins.\nReason : ${isBooked.reason}`:'Slot available for booking'}
                className={`TimeLine-cell${isBooked?" TimeLine-cell-booked":''}${isBooked&&(isBooked.start||isBooked.end)?' TimeLine-cell-booked-edge':''}`}>
            </div>
            {isBooked?
            <div className="TimeLine-cell-action-button"
                 onClick={()=>onDelete({booking: isBooked, room:item.name})}>
                    Delete
            </div>:null}
        </div>
    )
  }

    return (<div className="TimeLine-main" ref={el}>
        {blocks}
    </div>)
}

export default TimeLine;