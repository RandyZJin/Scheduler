import React, { Fragment } from "react";

import "components/Appointment/styles.scss";
import classNames from "classnames";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";

export default function Appointment(props) {
  // const buttonClass = classNames("button", {
  //    "button--confirm": props.confirm,
  //    "button--danger": props.danger
  //  });

   return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview && <Show interviewer={props.interview.interviewer} student={props.interview.student} />}
      {!props.interview && <Empty />}
      {/* <Empty /> */}
    </article>

   );
}