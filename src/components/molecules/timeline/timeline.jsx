import { Group, Line } from "react-konva";
import TimeLineItem from "./timeline-item";
import generateYAxisPoints from "../../../utilities/generate-y-axis-points";

const TimeLine = ({ x, y, start, stop, length }) => {
  const items = generateYAxisPoints(start, stop, length);
  const timeLines = [];

  items.forEach((item, index) => {
    timeLines.push(
      <TimeLineItem key={index} x={x} y={item.y + y} text={item.text} />
    );
  });

  return (
    <Group>
      {timeLines}
      <Line
        points={[x, y, x, y + length]}
        stroke="black"
        strokeWidth={2}
        lineCap="round"
        lineJoin="round"
      />
    </Group>
  );
};

export default TimeLine;
