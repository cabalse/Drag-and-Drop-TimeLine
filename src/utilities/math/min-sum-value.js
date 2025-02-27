import { differenceInMilliseconds } from "date-fns";

const minSumValue = (fromId, toId, values) => {
  let res = Number.MAX_SAFE_INTEGER;

  values.map((value) => {
    const to = new Date(value[toId]);
    const from = new Date(value[fromId]);
    const diff = differenceInMilliseconds(to, from);

    if (diff < res) {
      res = diff;
    }
  });

  return res;
};

export default minSumValue;
