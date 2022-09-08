export const updateDataAfterPOST = (result, setData, data) => {
  setData(data.concat(result));
};
