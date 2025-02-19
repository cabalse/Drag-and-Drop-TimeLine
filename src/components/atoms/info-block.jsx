import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoBlock = ({ title, time }) => {
  return (
    <div className="flex flex-row border-2 bg-white justify-between m-4 p-4">
      <div className="flex flex-col">
        <div className="text-xl">{title}</div>
        <div className="">{time}</div>
      </div>
      <div className="h-full flex items-center">
        <FontAwesomeIcon icon={faClock} size="2x" />
      </div>
    </div>
  );
};

export default InfoBlock;
