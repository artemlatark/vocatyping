const msToMinutes = (milliseconds: number) => {
  return milliseconds / 60 / 1000;
};

export const getTimerTime = (msGoal: number): [string, string, string, number] => {
  const hours = String(Math.floor(msToMinutes(msGoal) / 60));
  const minutes = String(Math.floor(msToMinutes(msGoal) - +hours * 60));
  const seconds = String(Math.round(msToMinutes(msGoal) * 60 - Math.floor((msToMinutes(msGoal) * 60) / 60) * 60));

  return [hours.length === 1 ? `0${+hours}` : hours, minutes.length === 1 ? `0${+minutes}` : minutes, seconds.length === 1 ? `0${+seconds}` : seconds, msGoal];
};
