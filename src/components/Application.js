import React, { useEffect } from "react";
import axios from "axios";
// import axios from "__mocks__/axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
// import useVisualMode from "hooks/useVisualMode";
import useApplicationData from "hooks/useApplicationData";



export default function Application(props) {
  // const [currentDay, setCurrentDay] = useState('Monday');
  // const [days, setDays] = useState([]);

  const {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();



  // const [setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   // you may put the line below, but will have to remove/comment hardcoded appointments variable
  //   appointments: {},
  //   interviewers: {}
  // });

  // let dailyAppointments = [];
  // const dailyAppointments = getAppointmentsForDay(state, state.day);


  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));

  //   //... your code here ...
  // }


  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewerList={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });


  useEffect(() => {
    // axios.get("/api/days")
    //   .then(response => {
    //     console.log(response.data);
    //     setDays(response.data);
    //   })
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
      ;
  }, [])
  // const appointmentsMapper = (appointmentsObj) => {
  //   const appointmentsArray = Object.values(appointmentsObj);
  //   return dailyAppointments.map((appointment) => {
  //     return <Appointment
  //       key={appointment.id}
  //       {...appointment}
  //     // time={appointment.time}
  //     // id={appointment.id}
  //     // interview={appointment.interview}
  //     />
  //   })
  // }
  // let result = (appointmentsMapper(appointments))
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            // setDay={day => setCurrentDay(day)}
            onChange={day => setDay(day)}

          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {/* {appointmentsMapper(appointments)} */}
        {/* {dailyAppointments.map((appointment) => {
          return <Appointment
            key={appointment.id}
            {...appointment}

          />
        }
        )} */}
        {schedule}
        <Appointment key="last" time="5pm" />

      </section>

    </main>
  );
}
