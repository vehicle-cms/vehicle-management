import api from '../services/backendApi';

export const selectImage = (id) => {
  return {
    type: 'GET_SELECTED_ADMIN_IMAGE',
    payload: id,
  };
};

const getAdminRequest = () => {
  return {
    type: 'GET_ADMINS_REQUEST',
  };
};

export const getAdminSuccess = (Orders) => {
  return {
    type: 'GET_ADMINS_SUCCESS',
    payload: Orders,
  };
};

const getAdminFailure = (error) => {
  return {
    type: 'GET_ADMINS_FAILURE',
    payload: error,
  };
};
export const GetAdmins = (navigate) => {
  return (dispatch) => {
    dispatch(getAdminRequest());
    api
      .get('user/manager/')
      .then((response) => response.data)
      .then((data) => {
        dispatch(getAdminSuccess(data));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(getAdminFailure(errorMessage));
      });
  };
};



export const setAdmin = (id) => {
  return {
    type: 'GET_SELECTED_ADMIN',
    payload: id,
  };
};

export const setShow = (value) => {
  return {
    type: 'SET_SHOW',
    payload: value,
  };
};
export const addAdmin = (items) => {
  return {
    type: 'ADD_ADMIN',
    payload: items,
  };
};
export const setVisible = () => {
  return {
    type: 'SET_VISIBLE',
  };
};
export const closeVisible = () => {
  return {
    type: 'CLOSE_VISIBLE',
  };
};

const getCountRequest = () => {
  return {
    type: 'GET_COUNT_REQUEST',
  };
};

export const getCountSuccess = (DATA) => {
  return {
    type: 'GET_COUNT_SUCCESS',
    payload: DATA,
  };
};

const getCountFailure = (error) => {
  return {
    type: 'GET_COUNT_FAILURE',
    payload: error,
  };
};
export const GetCounts = (navigate) => {
  return (dispatch) => {
    dispatch(getCountRequest());
    api
      .get('/admin/count-all')
      .then((response) => response.data)
      .then((data) => {
        dispatch(getCountSuccess(data?.result));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(getCountFailure(errorMessage));
      });
  };
};

export const managerCount = (data) => {
  return {
    type: 'MANAGER_COUNT',
    payload:data
  };
};


//drivers
const getDriverRequest = () => {
  return {
    type: 'GET_DRIVERS_REQUEST',
  };
};

export const getDriverSuccess = (Orders) => {
  return {
    type: 'GET_DRIVERS_SUCCESS',
    payload: Orders,
  };
};

const getDriverFailure = (error) => {
  return {
    type: 'GET_DRIVERS_FAILURE',
    payload: error,
  };
};
export const GetDrivers = (navigate) => {
  return (dispatch) => {
    dispatch(getDriverRequest());
    api
      .get('user/driver/')
      .then((response) => response.data)
      .then((data) => {
        dispatch(getDriverSuccess(data));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(getDriverFailure(errorMessage));
      });
  };
};
export const setDriver = (id) => {
  return {
    type: 'GET_SELECTED_DRIVER',
    payload: id,
  };
};