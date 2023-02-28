import React, { Fragment } from "react";

import "components/Appointment/styles.scss";
// import classNames from "classnames";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "ARE YOU SURE?"
  const EDIT = "EDIT"
  const DELETING = "DELETING"
  const ERROR_SAVE = "Appointment could not be booked"
  const ERROR_DELETE = "Appointment could not be cancelled"

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
      .catch(error => transition(ERROR_SAVE, true));

  }

  function confirmDeletion() {
    transition(CONFIRM);
  }

  function deleteInterview(id) {
    console.log(id);
    transition(DELETING, true);

    props.cancelInterview(id)
      .then(() => {

        transition(EMPTY);
      })
      .catch(error => transition(ERROR_DELETE, true));

  }


  const { mode, transition, back } = useVisualMode(
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
        {mode === DELETING && (
          <Status
            message={DELETING}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            message={ERROR_SAVE}
            onClose={back}
          />
        )}
                {mode === ERROR_DELETE && (
          <Error
            message={ERROR_DELETE}
            onClose={back}
          />
        )}


      </Fragment>

    </article>

  );
}