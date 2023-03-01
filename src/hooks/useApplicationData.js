import axios from 'axios';
import { useState } from "react";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => {
    setState(prev => ({ ...prev, day }));
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`api/appointments/${id}`, appointment)
      .then((res) => {
        console.log(res)
        let newDays = spotsRemaining(state.day);

        setState(prev => ({ ...prev, days: newDays, appointments }));
      })
    // .catch((err) => console.log(err))


  }

  function cancelInterview(id) {
    console.log(`deletion request`)
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`api/appointments/${id}`)
      .then((res) => {
        console.log(res);
        let newDays = spotsRemaining(state.day);
        setState(prev => ({ ...prev, days: newDays, appointments }));
      })
    // .catch((err) => console.log(err))

  }

  function spotsRemaining(currentDayName) {
    let replacementDays = []
    let replacementDay = {}
    for (let eachDay of state.days) {
      if (currentDayName === eachDay.name) {
        let newSpots = 0;
        eachDay.appointments.map(x => {
          if (state.appointments[x].interview === null) {
            newSpots++;
          }
        })
        replacementDay = { ...eachDay, spots: newSpots }
        replacementDays.push(replacementDay)
      } else {
        replacementDays.push(eachDay);
      }
    }
    return (replacementDays);
  }

  return {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview
  }
}

