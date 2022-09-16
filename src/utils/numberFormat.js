// Create our number formatter.
const numberFormat = () => {
  const isDollar = localStorage.getItem('currency') === 'usd' ? true : false;

  // console.log('NUMBER FORMAT ISDOLLAR: ', isDollar);

  const options = {
    locale: isDollar ? 'en-US' : 'vi-VN',
    currency: isDollar ? 'USD' : 'VND',
  };
  return new Intl.NumberFormat(options.locale, {
    style: 'currency',
    currency: options.currency,
  });
};

// These options are needed to round to whole numbers if that's what you want.
//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)

export default numberFormat;
