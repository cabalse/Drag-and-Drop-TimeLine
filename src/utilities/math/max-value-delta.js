import { differenceInMilliseconds } from "date-fns";

const maxValueDelta = (fromId, toId, values) => {
  let minValue = values[0][fromId];
  let maxValue = values[0][toId];

  values.map((value) => {
    if (value[fromId] < minValue) {
      minValue = value[fromId];
    }
    if (value[toId] > maxValue) {
      maxValue = value[toId];
    }
  });

  const ret = differenceInMilliseconds(maxValue, minValue);
  console.log(ret);
  return ret;
};

export default maxValueDelta;
