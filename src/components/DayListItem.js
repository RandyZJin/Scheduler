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
  const formatSpots = (spots) => {
    if (spots < 1) {
      return <h3 className="text--light" >no spots remaining</h3>;
    } else if (spots === "1") {
      return <h3 className="text--light" >1 spot remaining</h3>;
    } else {
      return <h3 className="text--light" >{spots} spots remaining</h3>;
    }

  };
  return (
    <li
      onClick={() => setDay(dayName)
      }
      className={buttonClass}
      data-testid="day"

    >
      <h2 className="text--regular">{dayName}</h2>
      {formatSpots(`${numSpots}`)}
    </li>
  );
}
