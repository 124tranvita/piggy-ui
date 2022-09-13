import resolveConfig from 'tailwindcss/resolveConfig';
import dateFormat from 'dateformat';

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/css/tailwind.config.js');
};

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

export const formatValue = (value) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3,
    notation: 'compact',
  }).format(value);

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

  // console.log('FUNCTION DATA: ', data);
  // console.log('FUNCTION LABEL: ', labels);

  const matchByCreateAtObj = data.reduce((obj, { createAt, amount, price }) => {
    if (amount) {
      obj[createAt] = obj[createAt] || { createAt, amount };
      obj[createAt].amount = obj[createAt].amount + amount;
    } else {
      obj[createAt] = obj[createAt] || { createAt, price };
      obj[createAt].price = obj[createAt].price + price;
    }

    return obj;
  }, {});

  for (const property in matchByCreateAtObj) {
    matchByCreateAtArr.push(matchByCreateAtObj[property]);
  }

  // console.log('ENHANCED DATA: ', matchByCreateAtArr);

  for (let value of labels) {
    value = dateFormat(value, 'yyyy-mm-dd');
    const result = matchByCreateAtArr.filter(
      (el) => dateFormat(el.createAt, 'yyyy-mm-dd') === value
    );

    console.log('RESULT: ', result);

    if (result[0]) {
      dataArray.push(result[0].price ?? result[0].amount);
    } else {
      dataArray.push(0);
    }
  }

  // console.log('FINAL DATA: ', dataArray);

  return dataArray;
};
