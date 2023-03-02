import DayListItem from "./DayListItem";
import React from "react";

export default function DayList(props) {
  const dayMapper = (list) => {
    return list.map(item => {
      return <DayListItem
        key={item.id}
        id={item.id}
        name={item.name}
        spots={item.spots}
        selected={item.name === props.value}
        setDay={props.onChange}
      />
    })
  }

  return (
    <ul>
      {
        dayMapper(props.days)
      }
    </ul>
  )
};