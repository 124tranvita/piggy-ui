// export const PREFIX = 'http://192.168.1.236:4000/api/v1/';
export const PREFIX = 'http://nezumi.asia:4000/api/v1/';

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
      response.timestamp = new Date().toISOString();
      response.unread = true;
      /**Dispatch response data to NotificationContext */
      dispatch({ type: 'ADD', payload: response });
      /**Show toast notification */
      dispatch({ type: 'SET_ISTOASTOPEN', payload: true });
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    /**Set global isLoading to false */
    dispatch({ type: 'SET_ISLOADING', payload: false });

    return data;
  } catch (error) {
    /**Add additional information to error object */
    const enhancedErrData = {
      status: 500,
      timestamp: new Date().toISOString(),
      unread: true,
    };

    /**Set global isLoading to false */
    dispatch({ type: 'SET_ISLOADING', payload: false });
    /**Dispatch error data to NotificationContext */
    dispatch({ type: 'ADD', payload: enhancedErrData });
    /**Show toast notification */
    dispatch({ type: 'SET_ISTOASTOPEN', payload: true });
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
      response.timestamp = new Date().toISOString();
      response.unread = true;
      /**Dispatch response data to NotificationContext */
      dispatch({ type: 'ADD', payload: response });
      /**Show toast notification */
      dispatch({ type: 'SET_ISTOASTOPEN', payload: true });
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    /**Add aditional information to response object */
    response.timestamp = new Date().toISOString();
    response.unread = true;
    /**Dispatch response data to NotificationContext */
    dispatch({ type: 'ADD', payload: response });
    /**Show toast notification */
    dispatch({ type: 'SET_ISTOASTOPEN', payload: true });

    return data;
  } catch (error) {
    console.log(error.message);
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
      response.timestamp = new Date().toISOString();
      response.unread = true;
      /**Dispatch response data to NotificationContext */
      dispatch({ type: 'ADD', payload: response });
      /**Show toast notification */
      dispatch({ type: 'SET_ISTOASTOPEN', payload: true });
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    /**Create notification object as DELETE not response anything */
    response.timestamp = new Date().toISOString();
    response.unread = true;

    /**Dispatch notification data to NotificationContext */
    dispatch({ type: 'ADD', payload: response });
    /**Show toast notification */
    dispatch({ type: 'SET_ISTOASTOPEN', payload: true });

    console.log('DELETE FETCH DATA: ', data);

    return data;
  } catch (error) {
    console.log(error.message);
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
      response.timestamp = new Date().toISOString();
      response.unread = true;
      /**Dispatch response data to NotificationContext */
      dispatch({ type: 'ADD', payload: response });
      /**Show toast notification */
      dispatch({ type: 'SET_ISTOASTOPEN', payload: true });
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    /**Add aditional information to response object */
    response.timestamp = new Date().toISOString();
    response.unread = true;
    /**Dispatch response data to NotificationContext */
    dispatch({ type: 'ADD', payload: response });
    /**Show toast notification */
    dispatch({ type: 'SET_ISTOASTOPEN', payload: true });

    return data;
  } catch (error) {
    console.log(error.message);
    // /**Add additional information to error object */
    // const enhancedErrData = {
    //   status: 500,
    //   timestamp: new Date().toISOString(),
    //   unread: true,
    // };

    // /**Dispatch error data to NotificationContext */
    // dispatch({ type: 'ADD', payload: enhancedErrData });
    // /**Show toast notification */
    // dispatch({ type: 'SET_ISTOASTOPEN', payload: true });
  }
};
