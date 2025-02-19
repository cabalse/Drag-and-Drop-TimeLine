import { Layer, Line } from "react-konva";
import TimeLineItem from "./timeline-item";

function generateYAxisPoints(startTime, stopTime, length) {
  const start = new Date(startTime);
  const stop = new Date(stopTime);

  console.log("start", start);
  console.log("stop", stop);
  console.log("lengthPx", length);

  if (isNaN(start) || isNaN(stop) || start >= stop) {
    throw new Error("Invalid start or stop time");
  }

  const hours = [];
  let current = new Date(start);
  current.setMinutes(0, 0, 0); // Round to the nearest hour

  while (current <= stop) {
    hours.push(new Date(current));
    current.setHours(current.getHours() + 1);
  }

  const step = length / (hours.length - 1); // Calculate spacing between points

  return hours.map((time, index) => ({
    text: time.toISOString().slice(11, 16), // Format HH:MM
    y: index * step,
  }));
}

const TimeLine = ({ x, y, start, stop, length }) => {
  const items = generateYAxisPoints(start, stop, length);
  const timeLine = [];

  items.forEach((item, index) => {
    timeLine.push(
      <TimeLineItem key={index} x={x} y={item.y + y} text={item.text} />
    );
  });

  return (
    <Layer>
      {timeLine}
      <Line
        points={[x, y, x, y + length]}
        stroke="black"
        strokeWidth={2}
        lineCap="round"
        lineJoin="round"
      />
    </Layer>
  );
};

export default TimeLine;
