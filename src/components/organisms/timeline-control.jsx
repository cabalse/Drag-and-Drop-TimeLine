import { Layer } from "react-konva";
import TimeLine from "../molecules/timeline/timeline";
import TimeHandle from "../atoms/time-handle";
import getYCoordForTime from "../../utilities/get-y-coord-for-time";
import getTimeForYCoord from "../../utilities/get-time-from-y-coord";
import { useState } from "react";
import { format } from "date-fns";

const placementX = 50;
const placementY = 0;

const TimeLineControl = ({
  title,
  x,
  y,
  start,
  stop,
  length,
  controls,
  onChange,
}) => {
  const offsetY = placementY + y;
  const offsetX = placementX + x;
  const minY = offsetY;
  const maxY = offsetY + length;

  let values = [];
  controls.forEach((control) => {
    values = { ...values, [control.id]: control.value };
  });
  const [handleValues, setHandleValues] = useState(values);

  return (
    <Layer>
      <TimeLine
        x={placementX + x}
        y={placementY + y}
        start={start}
        stop={stop}
        length={length}
      />
      {controls.map((control) => (
        <TimeHandle
          id={control.id}
          key={control.id}
          title={control.title}
          value={format(handleValues[control.id], "HH:mm:ss")}
          handle={true}
          x={offsetX}
          y={offsetY + getYCoordForTime(start, stop, length, control.value)}
          minY={minY}
          maxY={maxY}
          limit={{
            min:
              getYCoordForTime(start, stop, length, control.limit.min) +
              offsetY,
            max:
              getYCoordForTime(start, stop, length, control.limit.max) +
              offsetY,
          }}
          onChange={(value) => {
            const date = getTimeForYCoord(start, stop, length, value - offsetY);
            setHandleValues((prevState) => {
              const newState = {
                ...prevState,
                [control.id]: date,
              };
              onChange(title, control.title, control.id, newState);
              return newState;
            });
          }}
        />
      ))}
    </Layer>
  );
};

export default TimeLineControl;
