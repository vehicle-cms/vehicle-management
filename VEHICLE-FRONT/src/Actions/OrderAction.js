import api from '../services/backendApi';

const getCampaignRequest = () => {
  return {
    type: 'GET_CAMPAIGN_REQUEST',
  };
};

export const getCampaignSuccess = (Orders) => {
  return {
    type: 'GET_CAMPAIGN_SUCCESS',
    payload: Orders,
  };
};

const getCampaignFailure = (error) => {
  return {
    type: 'GET_CAMPAIGN_FAILURE',
    payload: error,
  };
};
export const GetCampaign = (navigate) => {
  return (dispatch) => {
    dispatch(getCampaignRequest());
    api
      .get('/user/order/')
      .then((response) => response.data)
      .then((data) => {
        dispatch(getCampaignSuccess(data));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(getCampaignFailure(errorMessage));
      });
  };
};
export const setCampaign = (id) => {
  return {
    type: 'SET_CAMPAIGN',
    payload: id,
  };
};
export const addCampaign = (items) => {
  return {
    type: 'ADD_SEARCH_CAMPAIGN_ITEMS',
    payload: items,
  };
};

export const orderCount = (data) => {
  return {
    type: 'ORDER_COUNT',
    payload:data
  };
};
export const orderApprovedCount = (data) => {
  return {
    type: 'ORDER_APPROVED_COUNT',
    payload:data
  };
};
export const orderPendingCount = (data) => {
  return {
    type: 'ORDER_PENDING_COUNT',
    payload:data
  };
};
export const orderRejectedCount = (data) => {
  return {
    type: 'ORDER_REJECTED_COUNT',
    payload:data
  };
};
