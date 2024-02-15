import api from '../services/backendApi';

const getVehiclesRequest = () => {
  return {
    type: 'GET_MEMER_REQUEST',
  };
};

export const getVehiclesSuccess = Orders => {
  return {
    type: 'GET_MEMER_SUCCESS',
    payload: Orders,
  };
};

const getVehiclesFailure = error => {
  return {
    type: 'GET_MEMER_FAILURE',
    payload: error,
  };
};
export const GetVehicles = (navigate, page=10, limit=0) => {
  return dispatch => {
    dispatch(getVehiclesRequest());
    const queryParams = new URLSearchParams();
// pageNumber pageSize
    queryParams.append('pageNumber', limit);
    queryParams.append('pageSize', page);
    api
      .get(`vehicles/paginate?${queryParams.toString()}`)
      .then(response => response.data)
      .then(data => {
        console.log(data)
        dispatch(getVehiclesSuccess(data));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(getVehiclesFailure(errorMessage));
      });
  };
};
const getMemeddRequest = () => {
  return {
    type: 'GET_MEMEDD_REQUEST',
  };
};

export const getMemeddSuccess = Orders => {
  return {
    type: 'GET_MEMEDD_SUCCESS',
    payload: Orders,
  };
};

const getMemeddFailure = error => {
  return {
    type: 'GET_MEMEDD_FAILURE',
    payload: error,
  };
};
export const GetMemedd = navigate => {
  return dispatch => {
    dispatch(getMemeddRequest());
    api
      .get('memedd')
      .then(response => response.data)
      .then(data => {
        // console.log(data)
        dispatch(getMemeddSuccess(data?.result));
      })
      .catch(error => {
        const errorMessage = error.message;

        dispatch(getMemeddFailure(errorMessage));
      });
  };
};
export const setMemedd = id => {
  return {
    type: 'SET_MEMEDD',
    payload: id,
  };
};
export const setMemerrs = id => {
  return {
    type: 'SET_MEMERRS',
    payload: id,
  };
};
export const setMemerPriceValue = (id, value) => {
  return {
    type: 'SET_MEMERRS_PRICE_VALUE',
    payload: { id, value },
  };
};

export const addMemers = items => {
  return {
    type: 'ADD_SEARCH_MEMERRS_ITEMS',
    payload: items,
  };
};
export const addMemedd = items => {
  return {
    type: 'ADD_SEARCH_MEMEDDS_ITEMS',
    payload: items,
  };
};
export const addReportData = data => {
  return {
    type: 'ADD_REPORT_DATA',
    payload: data,
  };
};
export const emptyReportData = () => {
  return {
    type: 'EMPTY_REPORT_DATA',
  };
};


export const vehicleActiveCount = (data) => {
  return {
    type: 'VEHICLE_ACTIVE_COUNT',
    payload:data
  };
};
export const vehicleInActiveCount = (data) => {
  return {
    type: 'VEHICLE_INACTIVE_COUNT',
    payload:data
  };
};
export const vehicleMaintenanceCount = (data) => {
  return {
    type: 'VEHICLE_MAINTENANCE_COUNT',
    payload:data
  };
};
// export const addPlatform = (items) =>{
//   return {
//       type: "ADD_SEARCH_ITEMS",
//       payload: items
//     };
// }
