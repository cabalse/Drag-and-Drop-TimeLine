import { useEffect, useState } from "react";

const INACTIVE_TIME = 800;

const Popcicle = ({ info }) => {
  const [state, setState] = useState(info ?? "");
  const [display, setDisplay] = useState(false);
  const [timeId, setTimerId] = useState(null);

  useEffect(() => {
    clearTimeout(timeId);

    setState(info);
    setDisplay(true);

    const id = setTimeout(() => {
      if (display) setDisplay(false);
    }, INACTIVE_TIME);

    setTimerId(id);
  }, [info]);

  return (
    <div
      className={`absolute w-full z-20 flex flex-row justify-center transition-transform duration-200 ${
        display && info != "" ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-3/8 p-4 rounded-b-md bg-green-600">
        <div className="text-center">{state}</div>
      </div>
    </div>
  );
};

export default Popcicle;
