export function getAppointmentsForDay(state, day) {
  let selectedDay = state.days.filter(x => x.name === day);
  if (selectedDay.length === 0) {
    return [];
  }
  let selectedAppointments = Object.values(state.appointments).filter(x => selectedDay[0].appointments.includes(x.id))
  return selectedAppointments;

}

export function getInterview(state, interview) {
  let selectedInterview = null;
  if (interview) {
    selectedInterview = interview;
    for (let key in state.interviewers) {
      if (selectedInterview.interviewer === state.interviewers[key].id) {
        selectedInterview.interviewer = state.interviewers[key];
      }
    }
  }
  return selectedInterview;
}

export function getInterviewersForDay(state, day) {
  let interviewerListForDay = [];
  for (let individualDays in state.days) {
    if (state.days[individualDays].name === day) {
      interviewerListForDay = state.days[individualDays].interviewers;
    }
  }
  return interviewerListForDay.map(id => state.interviewers[id]);
}