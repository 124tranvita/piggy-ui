export const PREFIX = 'http://192.168.1.236:4000/api/v1/';

/**GET REQUEST */
export const getData = async (path, token, dispatch) => {
  const url = PREFIX + path;
  try {
    /**Set global isLoading to true */
    dispatch({ type: 'SET_ISLOADING', payload: true });

    /**Send GET request to server with user's token */
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    /**Check if response ok or not */
    if (!response.ok) {
      /**Add aditional information to response object */
      data.timestamp = new Date().toISOString();
      data.unread = true;
      /**Dispatch response data to NotificationContext */
      dispatch({ type: 'ADD', payload: data });
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    /**Set global isLoading to false */
    dispatch({ type: 'SET_ISLOADING', payload: false });

    return data;
  } catch (error) {
    /**Add additional information to error object */
    const enhancedErrData = {
      status: 'failed',
      timestamp: new Date().toISOString(),
      unread: true,
      message: `Server unavailable. ${error.message} data.`,
    };

    /**Dispatch error data to NotificationContext */
    dispatch({ type: 'ADD', payload: enhancedErrData });
    /**Set global isLoading to false */
    dispatch({ type: 'SET_ISLOADING', payload: false });
  }
};

/**POST REQUEST */
export const postData = async (path, token, value, dispatch) => {
  const url = PREFIX + path;
  try {
    /**Send POST request to server with user's token */
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });

    const data = await response.json();

    /**Check if response ok or not */
    if (!response.ok) {
      /**Add aditional information to response object */
      data.timestamp = new Date().toISOString();
      data.unread = true;
      /**Dispatch response data to NotificationContext */
      dispatch({ type: 'ADD', payload: data });
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    /**Add aditional information to response object */
    data.timestamp = new Date().toISOString();
    data.unread = true;
    /**Dispatch response data to NotificationContext */
    dispatch({ type: 'ADD', payload: data });

    return data;
  } catch (error) {
    /**Add additional information to error object */
    const enhancedErrData = {
      status: 'failed',
      timestamp: new Date().toISOString(),
      unread: true,
      message: `Server unavailable. ${error.message} data.`,
    };

    /**Dispatch error data to NotificationContext */
    dispatch({ type: 'ADD', payload: enhancedErrData });
  }
};

/**DELETE REQUEST */
export const deleteData = async (path, token, dispatch) => {
  const url = PREFIX + path;
  try {
    /**Send DELETE request to server with user's token */
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });

    const data = await response;

    /**Check if response ok or not */
    if (!response.ok) {
      /**Add aditional information to response object */
      data.timestamp = new Date().toISOString();
      data.unread = true;
      /**Dispatch response data to NotificationContext */
      dispatch({ type: 'ADD', payload: data });
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    /**Create notification object as DELETE not response anything */
    const notif = {
      status: data.status,
      timestamp: new Date().toISOString(),
      unread: true,
    };
    /**Dispatch notification data to NotificationContext */
    dispatch({ type: 'ADD', payload: notif });

    return data;
  } catch (error) {
    /**Add additional information to error object */
    const enhancedErrData = {
      status: 'failed',
      timestamp: new Date().toISOString(),
      unread: true,
      message: `Server unavailable. ${error.message} data.`,
    };

    /**Dispatch error data to NotificationContext */
    dispatch({ type: 'ADD', payload: enhancedErrData });
  }
};

/**PATCH REQUEST */
export const patchData = async (path, token, value, dispatch) => {
  const url = PREFIX + path;
  try {
    /**Send PATCH request to server with user's token */
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });

    const data = await response.json();
    /**Check if response ok or not */
    if (!response.ok) {
      /**Add aditional information to response object */
      data.timestamp = new Date().toISOString();
      data.unread = true;
      /**Dispatch response data to NotificationContext */
      dispatch({ type: 'ADD', payload: data });
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    /**Add aditional information to response object */
    data.timestamp = new Date().toISOString();
    data.unread = true;
    /**Dispatch response data to NotificationContext */
    dispatch({ type: 'ADD', payload: data });

    return data;
  } catch (error) {
    /**Add additional information to error object */
    const enhancedErrData = {
      status: 'failed',
      timestamp: new Date().toISOString(),
      unread: true,
      message: `Server unavailable. ${error.message} data.`,
    };

    /**Dispatch error data to NotificationContext */
    dispatch({ type: 'ADD', payload: enhancedErrData });
  }
};
