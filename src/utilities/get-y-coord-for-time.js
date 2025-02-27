import { add, setMinutes, setSeconds } from "date-fns";

const getYCoordForTime = (start, stop, length, queryTime) => {
  if (isNaN(start) || isNaN(stop) || start >= stop) {
    throw new Error("Invalid start or stop time");
  }

  // Calculate timeline boundaries just like generateYAxisPoints:
  const timelineStart = add(start, { hours: -1 });
  // Reset timelineStart to the beginning of the hour:
  const adjustedStart = setSeconds(setMinutes(timelineStart, 0), 0);
  const timelineEnd = add(stop, { hours: 1 });

  // Convert queryTime to a Date if needed:
  const queryDate = new Date(queryTime);
  if (queryDate < adjustedStart || queryDate > timelineEnd) {
    throw new Error("Query time is out of bounds");
  }

  // Determine the total duration (in milliseconds) of the timeline:
  const totalDuration = timelineEnd.getTime() - adjustedStart.getTime();
  // Calculate the elapsed time from timelineStart to queryTime:
  const elapsed = queryDate.getTime() - adjustedStart.getTime();

  // Use linear interpolation to map the query time to a Y coordinate:
  const y = (elapsed / totalDuration) * length;
  return y;
};

export default getYCoordForTime;
