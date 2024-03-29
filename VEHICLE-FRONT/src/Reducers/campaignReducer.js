const initialState = {
  campaigns: [],
  selectedCampaign: {},
  selectedCampaignDriver: [],
  selectedCampaignVehicle: [],
  selectedCampaignCustomer: [],
  selectedCampaignManager: [],
  selectedCampaignRating: [],
  findCampaign: [],
  searchCampaign: [],
  orderCount:0,
  orderApprovedCount:0,
  orderPendingCount:0,
  orderRejectedCount:0
};

function removeDuplicates(arr, key) {
  return arr.filter((item, index, self) =>
    index === self.findIndex((t) => t[key] === item[key])
  );
}
//orders
const CampaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CAMPAIGN_REQUEST':
      return { ...state, loading: true };

    case 'GET_CAMPAIGN_SUCCESS':
      // const newData = action?.payload?.map((data, i) => ({ ...data, key: i }));
      return { ...state, loading: false, campaigns: removeDuplicates(action?.payload,'id') };

    case 'GET_CAMPAIGN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'SET_CAMPAIGN':
      const findCampaign = state.campaigns.find(
        data => data?.id === action?.payload
      );
      if (findCampaign) {
        return {
          ...state,
          selectedCampaign: Array.isArray(findCampaign)
            ? findCampaign
            : [findCampaign],
          selectedCampaignDriver: Array.isArray(findCampaign?.driver)
            ? findCampaign?.driver
            : [findCampaign?.driver],
          selectedCampaignVehicle: Array.isArray(findCampaign?.vehicle)
            ? findCampaign?.vehicle
            : [findCampaign?.vehicle],
          selectedCampaignCustomer: Array.isArray(
            findCampaign?.customer
          )
            ? findCampaign?.customer
            : [findCampaign?.customer],
          selectedCampaignManager: Array.isArray(findCampaign?.manager)
            ? findCampaign?.manager
            : [findCampaign?.manager],
          selectedCampaignRating: Array.isArray(findCampaign?.rating)
            ? findCampaign?.rating
            : [findCampaign?.rating],
        };
      } else {
        return state;
      }
    case 'ADD_SEARCH_CAMPAIGN_ITEMS':
      const items1 = action?.payload;

      return {
        ...state,
        loading: false,
        searchCampaign: items1,
      };
     case 'ORDER_COUNT':
      return {
        ...state,
        orderCount:action?.payload
      }
       case 'ORDER_APPROVED_COUNT':
      return {
        ...state,
        orderApprovedCount:action?.payload
      }
       case 'ORDER_PENDING_COUNT':
      return {
        ...state,
        orderPendingCount:action?.payload
      }
       case 'ORDER_REJECTED_COUNT':
      return {
        ...state,
        orderRejectedCount:action?.payload
      }
    default:
      return state;
  }
};

export default CampaignReducer;
