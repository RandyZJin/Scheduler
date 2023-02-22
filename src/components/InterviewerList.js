
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"
import React from "react";

export default function InterviewerList(props) {
  // const dayMapper = (list) => {
  //   return list.map(item => {
  //     return <DayListItem
  //       key={item.id}
  //       name={item.name}
  //       spots={item.spots}
  //       selected={item.name === props.day}
  //       setDay={props.setDay}
  //     />
  //   })
  // }
  const interviewMapper = (list) => {
    return list.map(item => {
      return <InterviewerListItem 
      key = {item.id}
      name={item.name} 
      avatar = {item.avatar}
      selected={item.id === props.interviewer}
      setInterviewer={() => props.setInterviewer(item.id)}
      />
    })
  }

  return (
    // <ul>
    //   {
    //     dayMapper(props.days)
    //   }
    // </ul>
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewMapper(props.interviewers)}
      </ul>
    </section>
  )
};