import { Line, Text } from "react-konva";

const HORIZONTAL_LINE_WIDTH = 20;
const TEXT_WIDTH = 50;
const TEXT_HEIGHT = 10;

const TimeLineItem = ({ x, y, text }) => {
  const horizontalLine = [
    x - HORIZONTAL_LINE_WIDTH / 2,
    y,
    x + HORIZONTAL_LINE_WIDTH / 2,
    y,
  ];

  return (
    <>
      <Text
        x={x - TEXT_WIDTH}
        y={y - TEXT_HEIGHT / 2}
        text={text}
        fill={"black"}
      />
      <Line
        points={horizontalLine}
        stroke="black"
        strokeWidth={2}
        lineCap="round"
        lineJoin="round"
      />
    </>
  );
};

export default TimeLineItem;
