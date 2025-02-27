import { useEffect, useState } from "react";
import { Group, Line, Rect, Text } from "react-konva";

const WIDTH = 110;
const HEIGHT = 40;

const HANDLE_WIDTH = 10;
const HANDLE_HEIGHT = 10;
const HANDLE_X_OFFSET = -10;
const HANDLE_Y_OFFSET = 10;

const STROKE_WIDTH = 1;

const TimeHandle = ({
  id,
  title,
  x,
  y,
  minY,
  maxY,
  limit,
  value,
  handle = false,
  onChange,
}) => {
  const [state, setState] = useState({
    isDragging: false,
    x: x - WIDTH / 2,
    y: y,
  });

  const [val, setVal] = useState(value);

  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <Group
      x={state.x}
      y={state.y}
      dragBoundFunc={(pos) => {
        let newY = pos.y;
        if (pos.y < minY) {
          newY = minY;
        } else if (pos.y > maxY) {
          newY = maxY;
        }

        if (newY < limit.min) {
          newY = limit.min;
        } else if (newY > limit.max) {
          newY = limit.max;
        }

        return {
          x: state.x,
          y: newY,
        };
      }}
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
        onChange(e.target.y());
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
        strokeWidth={STROKE_WIDTH}
      />
      <Text x={5} y={5} fontSize={14} text={title} fill={"black"} />
      <Text x={5} y={25} fontSize={12} text={val} fill={"black"} />
      {handle && (
        <Group x={HANDLE_X_OFFSET} y={HANDLE_Y_OFFSET * (id - 1)}>
          <Rect
            width={HANDLE_WIDTH}
            height={HANDLE_HEIGHT}
            stroke={"true"}
            fill={"white"}
            strokeWidth={STROKE_WIDTH}
          />
          <Line
            points={[HANDLE_WIDTH, 1, HANDLE_WIDTH, HANDLE_HEIGHT - 1]}
            stroke={"white"}
            strokeWidth={STROKE_WIDTH * 2}
          />
        </Group>
      )}
    </Group>
  );
};

export default TimeHandle;
