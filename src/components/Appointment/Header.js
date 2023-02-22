import React from "react";


export default function Header(props) {
  // const buttonClass = classNames("button", {
  //    "button--confirm": props.confirm,
  //    "button--danger": props.danger
  //  });

   return (
    <header className="appointment__time">
  <h4 className="text--semi-bold">{props.time}</h4>
  <hr className="appointment__separator" />
</header>


   );
}