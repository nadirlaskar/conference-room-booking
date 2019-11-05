import React, { useState, useRef, useEffect } from "react";
import {checkInDuration} from '../common/utils';

import "./TimeLine.css";

function TimeLine({id, item, data}){
    let { bookings, selectedTime, selectedAllocatedDuration, selectedRoom, position, onDelete=()=>{} } =  data;
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
        for(let i=0;i<=booking.allocatedDuration;i++){
            let book = {...booking};
            if(i===0) book.start=true;
            else if(i===book.allocatedDuration) book.end=true;
            map[(hr*60+min)+i]=book;
        }
        return map;
    },{}):{}
  for(let i=minTime;i<maxTime;i+=step){
    let isBooked = hashMap[i]?hashMap[i]:false;
    let inDuration =  item.name===selectedRoom&&checkInDuration(i,selectedTime,selectedAllocatedDuration)
    blocks.push(
        <div title={isBooked?`This slot is booked by ${isBooked.username}, from ${isBooked.startTime} for ${isBooked.allocatedDuration}mins.\nAgenda : \n${isBooked.reason}`:'Slot available for booking'}    
             className="TimeLine-cell-action-wrapper">
                <div key={i} id={i} 
                className={`TimeLine-cell${isBooked?" TimeLine-cell-booked":inDuration?' TimeLine-cell-selected':''}${isBooked&&(isBooked.start||isBooked.end)?` TimeLine-cell-booked-edge-${(isBooked.start)?'left':'right'}`:''}`}>
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