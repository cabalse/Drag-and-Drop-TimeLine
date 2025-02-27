import { add, setMinutes, setSeconds } from "date-fns";

const getTimeForYCoord = (start, stop, length, y) => {
  if (isNaN(start) || isNaN(stop) || start >= stop) {
    throw new Error("Invalid start or stop time");
  }

  // Define the timeline boundaries as before.
  const timelineStart = add(start, { hours: -1 });
  // Adjust timelineStart to the start of the hour.
  const adjustedStart = setSeconds(setMinutes(timelineStart, 0), 0);
  const timelineEnd = add(stop, { hours: 1 });

  // Optionally check that y is within the allowed range.
  if (y < 0 || y > length) {
    throw new Error("Y coordinate is out of bounds");
  }

  // Calculate the total timeline duration in milliseconds.
  const totalDuration = timelineEnd.getTime() - adjustedStart.getTime();

  // Determine the fraction of the timeline represented by y.
  const fraction = y / length;

  // Compute the corresponding time by adding the fraction of totalDuration.
  const queryTime = new Date(
    adjustedStart.getTime() + fraction * totalDuration
  );

  return queryTime;
};

export default getTimeForYCoord;
