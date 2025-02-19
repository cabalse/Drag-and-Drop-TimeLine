import { useState } from "react";
import { Group, Layer, Rect, Text } from "react-konva";

const WIDTH = 110;
const HEIGHT = 35;

const padWithZero = (num) => {
  return num < 10 ? `0${num}` : num;
};

const calculateTime = (startHour, y) => {
  const hour = startHour + Math.floor(y / 50) - 1;
  const minute = padWithZero(Math.floor(((y % 50) / 50) * 60));
  return `${hour}:${minute}`;
};

const Time = ({ title, x, onChange }) => {
  const [state, setState] = useState({
    isDragging: false,
    x: x - WIDTH / 2,
    y: 50,
  });

  return (
    <Layer>
      <Group
        x={state.x}
        y={state.y}
        dragBoundFunc={(pos) => ({
          x: state.x,
          y: pos.y,
        })}
        draggable
        onDragStart={() => {
          setState((prevState) => ({
            ...prevState,
            isDragging: true,
          }));
        }}
        onDragMove={(e) => {
          setState((prevState) => ({
            ...prevState,
            y: e.target.y(),
          }));
          onChange(calculateTime(12, state.y));
        }}
        onDragEnd={(e) => {
          setState((prevState) => ({
            ...prevState,
            isDragging: false,
            y: e.target.y(),
          }));
        }}
      >
        <Rect
          width={WIDTH}
          height={HEIGHT}
          stroke={"true"}
          fill={"white"}
          strokeWidth={0.5}
        />
        <Text x={5} y={5} text={title} fill={"black"} />
        <Text
          x={5}
          y={20}
          text={"2025-01-01 " + calculateTime(12, state.y)}
          fill={"black"}
        />
      </Group>
    </Layer>
  );
};

export default Time;
