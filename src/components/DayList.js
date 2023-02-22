import DayListItem from "./DayListItem";
import React from "react";

export default function DayList(props) {
  const dayMapper = (list) => {
    return list.map(item => {
      return <DayListItem 
      key = {item.id}
      id = {item.id}
      name = {item.name}
      spots = {item.spots}
      selected = {item.name === props.day}
      setDay = {props.setDay}
      />
    })
  }
  
  return (
    <ul>
      {
        dayMapper(props.days)
      }
      {/* <DayListItem 
        key={props.days[0].id}
        name={props.days[0].name} 
        spots={props.days[0].spots} 
        selected={props.days[0].name === props.day}
        setDay={props.setDay}  
      />
      <DayListItem
        key={props.days[1].id} 
        name={props.days[1].name} 
        spots={props.days[1].spots} 
        selected={props.days[1].name === props.day}
        setDay={props.setDay}  
      />
      <DayListItem 
        key={props.days[2].id}
        name={props.days[2].name}
        spots={props.days[2].spots} 
        selected={props.days[2].name === props.day}
        setDay={props.setDay}  
      />       */}
    </ul>
  )
};