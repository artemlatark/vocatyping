const msToMinutes = (milliseconds: number) => {
  return milliseconds / 60 / 1000;
};

export const getTime = (type: 'hours' | 'minutes' | 'seconds', ms: number): string => {
  const hours = String(Math.floor(msToMinutes(ms) / 60));
  const minutes = String(Math.floor(msToMinutes(ms) - +hours * 60));
  const seconds = String(Math.ceil(ms / 1000 - Math.floor(msToMinutes(ms)) * 60));

  if (ms <= 0) return '00';

  switch (type) {
    case 'hours':
      return hours.length === 1 ? `0${+hours}` : hours;
    case 'minutes':
      return minutes.length === 1 ? `0${+minutes}` : minutes;
    case 'seconds':
      return seconds.length === 1 ? `0${+seconds}` : seconds;
    default:
      return 'unknown type';
  }
};
