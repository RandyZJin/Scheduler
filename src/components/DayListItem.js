import React from "react";

export default function DayListItem(props) {
  const dayName = props.name;
  const numSpots = props.spots;
  const setDay = props.setDay;
  return (
    <li onClick={()=>setDay(dayName)}>
      <h2 className="text--regular">{dayName}</h2> 
      <h3 className="text--light" >{numSpots} spots remaining</h3>
    </li>
  );
}
