import { useState } from "react";
import { Stage, Layer, Text, Rect, Group, Line } from "react-konva";

const calculateTime = (startHour, y) => {
  const hour = startHour + Math.floor(y / 50) - 1;
  const minute = padWithZero(Math.floor(((y % 50) / 50) * 60));
  return `${hour}:${minute}`;
};

const padWithZero = (num) => {
  return num < 10 ? `0${num}` : num;
};

const App = () => {
  const [state, setState] = useState({
    isDragging: false,
    x: 50,
    y: 50,
  });

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text x={150} y={46} text="12:00" fill={"black"} />
        <Line
          points={[190, 50, 210, 50]}
          stroke="black"
          strokeWidth={4}
          lineCap="round"
          lineJoin="round"
        />
        <Text x={150} y={96} text="13:00" fill={"black"} />
        <Line
          points={[190, 100, 210, 100]}
          stroke="black"
          strokeWidth={4}
          lineCap="round"
          lineJoin="round"
        />
        <Line
          points={[200, 10, 200, 790]}
          stroke="black"
          strokeWidth={4}
          lineCap="round"
          lineJoin="round"
        />
      </Layer>
      <Layer>
        <Rect
          x={5}
          y={5}
          width={500}
          height={800}
          stroke={true}
          strokeWidth={0.5}
        />
      </Layer>
      <Layer>
        <Group
          x={state.x}
          y={state.y}
          dragBoundFunc={(pos) => ({
            x: 50,
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
            width={300}
            height={50}
            stroke={"true"}
            fill={"white"}
            strokeWidth={0.5}
          />
          <Text x={5} y={5} text="Time" fill={"black"} />
          <Text
            x={5}
            y={20}
            text={"2025-01-01 " + calculateTime(12, state.y)}
            fill={"black"}
          />
        </Group>
      </Layer>
    </Stage>
  );
};

export default App;
