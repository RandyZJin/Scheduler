import React, { Fragment } from "react";

import "components/Appointment/styles.scss";
import classNames from "classnames";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "ARE YOU SURE?"
  const EDIT = "EDIT"

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer || 1
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {

        transition(SHOW);
      })

  }

  function confirmDeletion() {
    transition(CONFIRM);
  }

  function deleteInterview(id) {
    console.log(id);
    props.cancelInterview(id)
      .then(() => {

        transition(EMPTY);
      })

  }

  function backToShow() {
    transition(SHOW);
  }


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
        {mode === SHOW && props.interview && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={confirmDeletion}
            id={props.id}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewerList}
            onCancel={back}
            onSave={save}
            bookInterview={props.bookInterview}
          />
        )}
        {mode === SAVING && (
          <Status
            message={SAVING}
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            message={CONFIRM}
            onCancel={back}
            onConfirm={deleteInterview}
            id={props.id}

          />
        )}
        {mode === EDIT && (
          <Form
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewerList}
            onCancel={back}
            onSave={save}
            bookInterview={props.bookInterview}
          />
        )}


      </Fragment>

    </article>

  );
}