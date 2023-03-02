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

    return axios
      .put(`api/appointments/${id}`, { interview })
      .then((res) => {
        const updatedInterview = JSON.parse(res.config.data).interview
        const appointment = {
          ...state.appointments[id],
          interview: updatedInterview,
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        let newDays = updateSpots(state, appointments, id);
        setState(prev => ({ ...prev, days: newDays, appointments }));
      })
    // .catch((err) => console.log(err))


  }

  function cancelInterview(id) {
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
        let newDays = updateSpots(state, appointments, id);
        setState(prev => ({ ...prev, days: newDays, appointments }));
      })
    // .catch((err) => console.log(err))

  }

  const updateSpots = function (state, appointments, id) {

    let copyState = state;
    const affectedDay = { ...copyState.days.find(days => days.appointments.includes(id)) }
    let returnDays = copyState.days.map(day => {

      if (day.name === affectedDay.name) {
        let spots = 0;
        day.appointments.map(appointment => {
          if (appointments[appointment].interview === null) {
            spots++;
            
          }
          return null;
        })
        affectedDay.spots = spots;
        return affectedDay;
      }
      return day;

    })
    return returnDays;
  };

  return {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview
  }
}

