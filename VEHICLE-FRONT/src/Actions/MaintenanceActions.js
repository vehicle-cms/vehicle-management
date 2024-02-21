import api from '../services/backendApi';

const getPlatformRequest = () => {
  return {
    type: 'GET_PLATFORM_REQUEST',
  };
};

export const getPlatformSuccess = (Orders) => {
  return {
    type: 'GET_PLATFORM_SUCCESS',
    payload: Orders,
  };
};

const getPlatformFailure = (error) => {
  return {
    type: 'GET_PLATFORM_FAILURE',
    payload: error,
  };
};

export const GetPlatforms = (page, limit) => {

  const url = `/user/maintenance`;
  return (dispatch) => {
    dispatch(getPlatformRequest());
    api
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        dispatch(getPlatformSuccess(data));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(getPlatformFailure(errorMessage));
      });
  };
};


const getPartsRequest = () => {
  return {
    type: 'GET_PARTS_REQUEST',
  };
};

export const getPartsSuccess = (Orders) => {
  return {
    type: 'GET_PARTS_SUCCESS',
    payload: Orders,
  };
};

const getPartsFailure = (error) => {
  return {
    type: 'GET_PARTS_FAILURE',
    payload: error,
  };
};

export const GetParts = () => {

  const url = `/user/maintenance/parts`;
  return (dispatch) => {
    dispatch(getPartsRequest());
    api
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        dispatch(getPartsSuccess(data));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(getPartsFailure(errorMessage));
      });
  };
};

export const setPlatform = (id) => {
  return {
    type: 'SET_PLATFORM',
    payload: id,
  };
};

export const addPlatform = (items) => {
  return {
    type: 'ADD_SEARCH_ITEMS',
    payload: items,
  };
};
