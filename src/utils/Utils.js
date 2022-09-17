import dateFormat from 'dateformat';

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const getDatesInRange = (startDate, endDate) => {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const getDataByLabel = (labels, data) => {
  const dataArray = [];
  const matchByCreateAtArr = [];

  console.log('FUNCTION DATA: ', data);
  // console.log('FUNCTION LABEL: ', labels);

  const matchByCreateAtObj = data.reduce((obj, { createAt, amount, price }) => {
    console.log(createAt, amount, price);
    if (amount) {
      obj[createAt] = obj[createAt] || { createAt, amount: 0 };
      obj[createAt].amount = obj[createAt].amount + amount;
    }

    if (price) {
      obj[createAt] = obj[createAt] || { createAt, price: 0 };
      obj[createAt].price = obj[createAt].price + price;
    }

    return obj;
  }, {});

  console.log('MATCHED DATA OBJ: ', matchByCreateAtObj);

  for (const property in matchByCreateAtObj) {
    matchByCreateAtArr.push(matchByCreateAtObj[property]);
  }

  console.log('MATCHED DATA ARR: ', matchByCreateAtArr);

  for (let value of labels) {
    value = dateFormat(value, 'yyyy-mm-dd');
    const result = matchByCreateAtArr.filter(
      (el) => dateFormat(el.createAt, 'yyyy-mm-dd') === value
    );

    if (result[0]) {
      dataArray.push(result[0].price ?? result[0].amount);
    } else {
      dataArray.push(0);
    }
  }

  return dataArray;
};
