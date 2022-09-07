const PREFIX = 'http://192.168.1.236:4000/api/v1/';

export const getData = async (path, token) => {
  const url = PREFIX + path;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

export const postData = async (path, token, value, dispatch) => {
  const url = PREFIX + path;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });

  const data = await response.json();

  if (!response.ok) {
    // console.log(data);
    data.timestamp = new Date().toISOString();
    data.unread = true;
    dispatch({ type: 'ADD', payload: data });
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }

  data.timestamp = new Date().toISOString();
  data.unread = true;
  dispatch({ type: 'ADD', payload: data });

  return data;
};

export const deleteData = async (path, token, id, dispatch) => {
  const url = PREFIX + path;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });

  const data = await response;

  if (!response.ok) {
    data.timestamp = new Date().toISOString();
    data.unread = true;
    dispatch({ type: 'ADD', payload: data });
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  const notif = {
    status: data.status,
    timestamp: new Date().toISOString(),
    unread: true,
  };
  dispatch({ type: 'ADD', payload: notif });

  return data;
};

export const patchData = async (path, token, value, dispatch) => {
  const url = PREFIX + path;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });

  const data = await response.json();

  if (!response.ok) {
    data.timestamp = new Date().toISOString();
    data.unread = true;
    dispatch({ type: 'ADD', payload: data });
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }

  data.timestamp = new Date().toISOString();
  data.unread = true;
  dispatch({ type: 'ADD', payload: data });

  return data;
};
