import { useState } from "react";
import { Stage } from "react-konva";
import InfoBlock from "./atoms/info-block";
import TimeLineControl from "./organisms/timeline-control";
import { add, format } from "date-fns";
import maxValueDelta from "../utilities/math/max-value-delta";
import Popcicle from "./molecules/popcicle";
import minValue from "../utilities/math/min-value";
import minSumValue from "../utilities/math/min-sum-value";
import { getFormattedHoursMinutes } from "../utilities/time/get-hours-minutes";

const y = 30;
const start = new Date(2025, 2, 1, 7, 0, 0);
const stop = new Date(2025, 2, 1, 10, 0, 0);
const length = 600;

const App = () => {
  const [info, setInfo] = useState("");

  const [timeValues1, setTimeValues1] = useState({
    1: new Date(2025, 2, 1, 7, 15, 0),
    2: new Date(2025, 2, 1, 8, 0, 0),
    3: new Date(2025, 2, 1, 8, 0, 1),
    4: new Date(2025, 2, 1, 9, 30, 0),
  });

  const [timeValues2, setTimeValues2] = useState({
    1: new Date(2025, 2, 1, 8, 0, 0),
    2: new Date(2025, 2, 1, 8, 30, 0),
    3: new Date(2025, 2, 1, 10, 0, 0),
    4: new Date(2025, 2, 1, 10, 17, 0),
  });

  const [timeValues3, setTimeValues3] = useState({
    1: new Date(2025, 2, 1, 8, 0, 0),
    2: new Date(2025, 2, 1, 8, 30, 0),
    3: new Date(2025, 2, 1, 9, 0, 0),
    4: new Date(2025, 2, 1, 9, 30, 0),
  });

  const handleUpdateInfo = (timelineTitle, handleTitle, handleId, values) => {
    setInfo(
      `${timelineTitle} - ${handleTitle} : ${format(
        values[handleId],
        "HH:mm:ss"
      )}`
    );
  };

  return (
    <>
      <Popcicle info={info} />
      <div className="h-screen w-screen bg-gray-200">
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2 h-screen bg-gray-200">
            <InfoBlock
              title={"Max Value Delta 1 & 4"}
              info={getFormattedHoursMinutes(
                maxValueDelta(1, 4, [timeValues1, timeValues2, timeValues3])
              )}
            />
            <InfoBlock
              title={"Min Value 3"}
              info={format(
                new Date(minValue(3, [timeValues1, timeValues2, timeValues3])),
                "HH:mm:ss"
              )}
            />
            <InfoBlock
              title={"Min Sum Value 2 & 3"}
              info={getFormattedHoursMinutes(
                minSumValue(2, 3, [timeValues1, timeValues2, timeValues3])
              )}
            />
            <InfoBlock title={"Time 3"} timeDate={timeValues1[3]} />
            <InfoBlock title={"Time 4"} timeDate={timeValues1[4]} />
          </div>
          <div className="bg-white">
            <Stage width={1000} height={800}>
              <TimeLineControl
                title="timeLineControl1"
                x={30}
                y={y}
                start={start}
                stop={stop}
                length={length}
                controls={[
                  {
                    id: 4,
                    title: "Time 4",
                    value: timeValues1[4],
                    limit: {
                      min: timeValues1[3],
                      max: add(stop, { hours: 1 }),
                    },
                  },
                  {
                    id: 3,
                    title: "Time 3",
                    value: timeValues1[3],
                    limit: { min: timeValues1[2], max: timeValues1[4] },
                  },
                  {
                    id: 2,
                    title: "Time 2",
                    value: timeValues1[2],
                    limit: { min: timeValues1[1], max: timeValues1[3] },
                  },
                  {
                    id: 1,
                    title: "Time 1",
                    value: timeValues1[1],
                    limit: {
                      min: add(start, { hours: -1 }),
                      max: timeValues1[2],
                    },
                  },
                ]}
                onChange={(timelineTitle, handleTitle, handleId, values) => {
                  setTimeValues1(values);
                  handleUpdateInfo(
                    timelineTitle,
                    handleTitle,
                    handleId,
                    values
                  );
                }}
              />
              <TimeLineControl
                title="timeLineControl2"
                x={175}
                y={y}
                start={start}
                stop={stop}
                length={length}
                controls={[
                  {
                    id: 1,
                    title: "Time 1",
                    value: timeValues2[1],
                    limit: {
                      min: add(start, { hours: -1 }),
                      max: timeValues2[2],
                    },
                  },
                  {
                    id: 2,
                    title: "Time 2",
                    value: timeValues2[2],
                    limit: { min: timeValues2[1], max: timeValues2[3] },
                  },
                  {
                    id: 3,
                    title: "Time 3",
                    value: timeValues2[3],
                    limit: { min: timeValues2[2], max: timeValues2[4] },
                  },
                  {
                    id: 4,
                    title: "Time 4",
                    value: timeValues2[4],
                    limit: {
                      min: timeValues2[3],
                      max: add(stop, { hours: 1 }),
                    },
                  },
                ]}
                onChange={(timelineTitle, handleTitle, handleId, values) => {
                  setTimeValues2(values);
                  handleUpdateInfo(
                    timelineTitle,
                    handleTitle,
                    handleId,
                    values
                  );
                }}
              />
              <TimeLineControl
                title="timeLineControl3"
                x={320}
                y={y}
                start={start}
                stop={stop}
                length={length}
                controls={[
                  {
                    id: 1,
                    title: "Time 1",
                    value: timeValues3[1],
                    limit: {
                      min: add(start, { hours: -1 }),
                      max: timeValues3[2],
                    },
                  },
                  {
                    id: 2,
                    title: "Time 2",
                    value: timeValues3[2],
                    limit: { min: timeValues3[1], max: timeValues3[3] },
                  },
                  {
                    id: 3,
                    title: "Time 3",
                    value: timeValues3[3],
                    limit: { min: timeValues3[2], max: timeValues3[4] },
                  },
                  {
                    id: 4,
                    title: "Time 4",
                    value: timeValues3[4],
                    limit: {
                      min: timeValues3[3],
                      max: add(stop, { hours: 1 }),
                    },
                  },
                ]}
                onChange={(timelineTitle, handleTitle, handleId, values) => {
                  setTimeValues3(values);
                  handleUpdateInfo(
                    timelineTitle,
                    handleTitle,
                    handleId,
                    values
                  );
                }}
              />
            </Stage>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
