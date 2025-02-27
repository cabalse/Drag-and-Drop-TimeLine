const getHoursMinutes = (timeInMillsec) => {
  const hours = Math.floor(timeInMillsec / 3600000);
  const minutes = Math.floor((timeInMillsec % 3600000) / 60000);
  const seconds = Math.floor((timeInMillsec % 60000) / 1000);

  return { hours, minutes, seconds };
};

const getFormattedHoursMinutes = (timeInMillsec) => {
  const { hours, minutes, seconds } = getHoursMinutes(timeInMillsec);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export { getHoursMinutes, getFormattedHoursMinutes };
