import React, { Fragment } from "react";

import "components/Appointment/styles.scss";
import classNames from "classnames";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";


  const { mode, transition, back, setMode } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  // const buttonClass = classNames("button", {
  //    "button--confirm": props.confirm,
  //    "button--danger": props.danger
  //  });

  return (
    <article className="appointment">
      {/* <Header time={props.time} />
      {props.interview && <Show interviewer={props.interview.interviewer} student={props.interview.student} />}
      {!props.interview && <Empty />} */}
      {/* <Empty /> */}
      <Fragment>
        {/* <Header time={props.time} />
        {props.interview ?
          <Show interviewer={props.interview.interviewer} student={props.interview.student} />
          :
          <Empty />
          
        } */}
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewerList}
            onCancel={back}
          />
        )}

      </Fragment>

    </article>

  );
}