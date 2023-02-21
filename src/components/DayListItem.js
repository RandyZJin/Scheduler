import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
  const dayName = props.name;
  const numSpots = props.spots;
  const setDay = props.setDay;
  const buttonClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  return (
    <li onClick={()=>setDay(dayName)} className={buttonClass}>
      <h2 className="text--regular">{dayName}</h2> 
      <h3 className="text--light" >{numSpots} spots remaining</h3>
    </li>
  );
}
