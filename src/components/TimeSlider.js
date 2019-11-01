import React, {useRef, useEffect,useState, useCallback} from "react";
import "./TimeSlider.css";

function checkInDuration(time,selectedTime,checkInDuration){
    if(selectedTime==='') return false;
    let [hr,min] = selectedTime.split(':').map(x=>parseInt(x));
    let selectedTimeInMinutes = hr*60+min;
    let duration = time-selectedTimeInMinutes;
    return duration>0 && duration<=checkInDuration;
}

function TimeScale({ minTime, maxTime, step, onSelect, selectedTime, allocatedDuration, onScrollPositionChange }) {
  let scale = [], hr=minTime/60, min=0;
  const el = useRef(null);
  const [currentTime,setCurrentTime]  = useState(new Date());
  const [isLoaded,setLoaded] = useState(false);
  const [currentTimeScrollPosition, setCurrentTimeScrollPosition] = useState(-1);

  
  const measuredRef = useCallback(node => {
    if (node !== null && node.classList.contains('TimeScale-time-block-currentTime')) {
        setCurrentTimeScrollPosition(node.getBoundingClientRect().left);
    }
  }, []);

  useEffect(()=>{
      if(!isLoaded){
          if(currentTimeScrollPosition>0) {
              el.current.scrollLeft=currentTimeScrollPosition-el.current.getBoundingClientRect().left;
              onScrollPositionChange(el.current.scrollLeft);
            }
          setLoaded(currentTimeScrollPosition>0);
      }
      let id = setInterval(()=>{
        setCurrentTime(new Date());
      })
      return ()=> clearInterval(id);
  }, [currentTimeScrollPosition, isLoaded, onScrollPositionChange])

  const [continueScroll,setContinueScroll] = useState(-1);

  const keepScrolling = (step)=>{
      if(el.current.scrollLeft+step>=(currentTimeScrollPosition-el.current.getBoundingClientRect().left)) {
          el.current.scrollLeft+=step;
          onScrollPositionChange(el.current.scrollLeft);
        }
      setContinueScroll(setTimeout(()=>keepScrolling(step),100));
  }

  const stopScrolling = ()=>{
      clearTimeout(continueScroll);
  }

  for(let i=minTime;i<maxTime;i+=step){
      if(i>minTime+59&&i%60===0) {
         hr++;
         min=0
      }
      else if(i>minTime) min+=step;
      let currentHour = currentTime.getHours();
      let currentMin = currentTime.getMinutes();
      let isCurrentTime = ((currentHour===hr)&&(Math.abs(currentMin-min)<step));
      let value = `${hr}:${min}`;
      let isSelected = value === selectedTime || checkInDuration(i,selectedTime,allocatedDuration) ;
      scale.push(<div  
                    key={i} 
                    ref={measuredRef}
                    value={value}
                    className={
                        `TimeScale-time-block${isCurrentTime?' TimeScale-time-block-currentTime':''}${isSelected?' TimeScale-time-block-selectedTime':''}`
                    }
                    onClick={(e)=>onSelect(e.target.getAttribute('value'))}
                >
                    {`${hr<10?'0':''}${hr}:${min<10?'0':''}${min}`}
                </div>);
  }
  return (
    <div className="TimeScale-container">
      <div className="TimeScale button right"
            onPointerDown={()=>keepScrolling(-step)}
            onPointerUp={()=>stopScrolling()}
        >-</div>
      <div className="TimeScale-main" ref={el}>{scale}</div>
      <div className="TimeScale button left" 
            onPointerDown={()=>keepScrolling(step)}
            onPointerUp={()=>stopScrolling()}
      >+</div>
    </div>
  );
}

function TimeSlider({ currentTime, selectedTime, onSelect, children, allocatedDuration, onScroll }) {
  return (
    <div className='TimeSlider-container'>
      <TimeScale
        minTime={9 * 60}
        maxTime={18 * 60}
        step={5}
        selectedTime={selectedTime}
        currentTime={currentTime}
        onSelect={onSelect}
        allocatedDuration={parseInt(allocatedDuration)}
        onScrollPositionChange={onScroll}
      />
      <div className="TimeSlider-main">{children}</div>
    </div>
  );
}

export default TimeSlider;
