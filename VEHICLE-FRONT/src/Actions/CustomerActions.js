import api from '../services/backendApi';

const getTagsRequest = () => {
  return {
    type: 'GET_TAGS_REQUEST',
  };
};

export const getTagsSuccess = (Orders) => {
  return {
    type: 'GET_TAGS_SUCCESS',
    payload: Orders,
  };
};

const getTagsFailure = (error) => {
  return {
    type: 'GET_TAGS_FAILURE',
    payload: error,
  };
};
export const GetTags = (page=10, limit=0) => {
  const queryParams = new URLSearchParams();

    queryParams.append('pageNumber', limit);
    queryParams.append('pageSize', page);

  const url = `user/customer?${queryParams.toString()}`;
  return (dispatch) => {
    dispatch(getTagsRequest());
    api
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        // console.log(data)
        dispatch(getTagsSuccess(data));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(getTagsFailure(errorMessage));
      });
  };
};
export const setTag = (id) => {
  return {
    type: 'SET_TAG',
    payload: id,
  };
};
export const addTags = (items) => {
  return {
    type: 'ADD_SEARCH_ITEMS',
    payload: items,
  };
};
