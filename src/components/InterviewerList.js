
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"
import React from "react";
import PropTypes from 'prop-types';

function InterviewerList(props) {
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
      selected={item.id === props.value}
      setInterviewer={() => props.onChange(item.id)}
      // selected={item.id === props.interviewer}
      // setInterviewer={() => props.setInterviewer(item.id)}
      />
    })
  }

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewMapper(props.interviewers)}
      </ul>
    </section>
  )
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
}

export default InterviewerList;