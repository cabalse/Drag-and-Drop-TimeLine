import { useState } from "react";
import { Stage } from "react-konva";
import TimeLine from "./molecules/timeline/timeline";
import InfoBlock from "./atoms/info-block";
import Time from "./atoms/time";

const x = 100;
const y = 50;
const gap = 300;
const startTime = "2023-02-19T08:00:00Z";
const stopTime = "2023-02-19T14:00:00Z";
const length = 600;

const App = () => {
  const [time1, setTime1] = useState("00.00.00");
  const [time2, setTime2] = useState("00.00.00");
  const [time3, setTime3] = useState("00.00.00");

  return (
    <div className="h-screen w-screen bg-gray-200">
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2 h-screen bg-gray-200">
          <InfoBlock title={"Time 1"} time={time1} />
          <InfoBlock title={"Time 2"} time={time2} />
          <InfoBlock title={"Time 3"} time={time3} />
        </div>
        <div className="bg-white">
          <Stage width={1000} height={800}>
            <TimeLine
              x={x}
              y={y}
              start={startTime}
              stop={stopTime}
              length={length}
            />
            <TimeLine
              x={x + gap}
              y={y}
              start={startTime}
              stop={stopTime}
              length={length}
            />
            <TimeLine
              x={x + gap * 2}
              y={y}
              start={startTime}
              stop={stopTime}
              length={length}
            />
            <Time title="Time 1" x={x} onChange={setTime1} />
            <Time title="Time 2" x={x + gap} onChange={setTime2} />
            <Time title="Time 3" x={x + gap * 2} onChange={setTime3} />
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default App;
