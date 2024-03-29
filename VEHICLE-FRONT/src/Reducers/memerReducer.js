const initialState = {
  memers: [],//VEHICLES
  selectedMemer: {},
  selectedDriver:{},
  findMemer: [],
  searchMemerrs: [],
  memedd: [],
  selectedMemedd: {},
  findMemedd: [],
  searchMemedd: [],
  selectedMemerTag: [],
  reportData: [],
  activeCount:0,
  inactiveCount:0,
  maintenanceCount:0,
  vehicleCount:0
};


function removeDuplicates(arr, key) {
  return arr.filter((item, index, self) =>
    index === self.findIndex((t) => t[key] === item[key])
  );
}

// Function to merge two arrays without duplicates
// function mergeArrays(arr1, arr2) {
//   // Concatenate the arrays and remove duplicates
//   return removeDuplicates([...arr1, ...arr2]);
// }

// memer -->  memmed --> vehicle
const MemerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MEMER_REQUEST':
      return { ...state, loading: true };

    case 'GET_MEMER_SUCCESS':
      return { ...state, loading: false, memers: removeDuplicates(action?.payload,'id') };

    case 'GET_MEMER_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'GET_MEMEDD_REQUEST':
      return { ...state, loading: true };

    case 'GET_MEMEDD_SUCCESS':
           return { ...state, loading: false, memedd:removeDuplicates(action?.payload,'id')};
    case 'GET_MEMEDD_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'SET_MEMEDD':
      let findMemedd = state.memedd.find(data => action?.payload === data?.id);
      return {
        ...state,
        selectedMemedd: findMemedd,
      };
    case 'SET_MEMERRS':
      let findMemers = state.memers.find(data => action?.payload === data?.id);
      if (findMemers) {
        return {
          ...state,
          selectedMemer: findMemers,
          selectedMemerTag: Array.isArray(findMemers?.Tags)
            ? findMemers?.Tags
            : [findMemers?.Tags],
        };
      } else {
        return state;
      }
    case 'SET_MEMERRS_PRICE_VALUE':
      let findmemer1 = state.memers.find(
        data => action?.payload?.id === data?._id
      );
      findmemer1.price = action?.payload?.price;

      return {
        ...state,
        memers: [...state.memers, findmemer1],
      };
    case 'ADD_SEARCH_MEMERRS_ITEMS':
      const items = action?.payload;

      return {
        ...state,
        loading: false,
        searchMemerrs: items,
      };
    case 'ADD_SEARCH_MEMEDDS_ITEMS':
      const items1 = action?.payload;

      return {
        ...state,
        loading: false,
        searchMemedd: items1,
      };
    case 'ADD_REPORT_DATA':
      return {
        ...state,
        reportData: action?.payload,
      };
    case 'EMPTY_REPORT_DATA':
      return {
        ...state,
        reportData: [],
      };
    case 'VEHICLE_ACTIVE_COUNT':
      return {
        ...state,
        activeCount:action?.payload
      }
     case 'VEHICLE_INACTIVE_COUNT':
      return {
        ...state,
        inactiveCount:action?.payload
      }
       case 'VEHICLE_MAINTENANCE_COUNT':
      return {
        ...state,
        maintenanceCount:action?.payload
      }
       case 'VEHICLE_COUNT':
      return {
        ...state,
        vehicleCount:action?.payload
      }
    default:
      return state;
  }
};

export default MemerReducer;
