const minValue = (id, values) => {
  let res = new Date(values[0][id]).getTime();

  values.map((value) => {
    if (value[id] < res) {
      res = new Date(value[id]).getTime();
    }
  });

  return res;
};

export default minValue;
