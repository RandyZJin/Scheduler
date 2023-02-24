export function getAppointmentsForDay(state, day) {
  let selectedDay = state.days.filter(x => x.name === day);
  if (selectedDay.length === 0) {
    return [];
  }
  let selectedAppointments = Object.values(state.appointments).filter(x => selectedDay[0].appointments.includes(x.id))
  return selectedAppointments;

}
