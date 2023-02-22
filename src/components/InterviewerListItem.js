import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {
  const interviewer = {
    id: 1,
    name: "Sylvia Palmer",
    avatar: "https://i.imgur.com/LpaY82x.png"
  };

  const buttonClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  //  onClick={()=>props.setInterviewer (interviewer.id)}
  return (
    <li className={buttonClass} onClick={()=>props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name} 
    </li>

  );
}