export const updateDataAfterPOST = (result, setData, data) => {
  setData(data.concat(result));
};

export const updateDataAfterPATCH = (result, setData, data) => {
  const updatedData = data.map((el) => {
    if (el._id === result._id) el = result;
    return el;
  });
  setData(updatedData);
};

export const updateDataAfterDELETE = (id, setData, data) => {
  const updatedData = data.filter((el) => el._id !== id);
  setData(updatedData);
};
