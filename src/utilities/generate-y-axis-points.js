import { add, format, setMinutes, setSeconds } from "date-fns";

const generateYAxisPoints = (start, stop, length) => {
  if (isNaN(start) || isNaN(stop) || start >= stop) {
    throw new Error("Invalid start or stop time");
  }

  const startTime = add(start, { hours: -1 });
  const endTime = add(stop, {
    hours: 1,
  });

  const hours = [];
  let current = startTime;
  current = setSeconds(setMinutes(current, 0), 0);

  while (current <= endTime) {
    hours.push(format(current, "HH:mm"));
    current = add(current, { hours: 1 });
  }

  const step = length / (hours.length - 1);

  return hours.map((time, index) => ({
    text: time,
    y: index * step,
  }));
};

export default generateYAxisPoints;
