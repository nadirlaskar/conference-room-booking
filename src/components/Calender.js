import React from 'react';
import './Calender.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = React.forwardRef((props,ref) => {
  return (
     <div  className="Calender-main" onClick={props.onClick} ref={ref}>
       {props.value || props.placeholder}
     </div>
  )

})

function Calender({minDate=new Date(), value, onDateSelected}){
  return(
    <div className="Calender-wrapper">
       <DatePicker
        title={"Book for"}
        calendarClassName={"Calender-popup"}
        minDate={minDate}
        selected={value}
        onChange={onDateSelected}
        dateFormat="MMMM d, yyyy"
        todayButton="Today"
        customInput={<CustomInput/>}
      />
    </div>
  );
}

export default Calender;