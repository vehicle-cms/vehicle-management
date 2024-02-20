import { failureNotifier, successNotifier } from '../notifications';
import api from '../../services/backendApi';
import { addReportData, GetVehicles } from '../../Actions/VehicleActions';
import moment from 'moment';
import { GetCampaign } from '../../Actions/OrderAction';

export const updateStatus = async (navigate, dispatch, code, value) => {
  try {
    const updateMemer = await api.put('memerr', {
      memerrCode: code,
      isNotActive: value,
    });
    successNotifier(updateMemer?.data?.message);
    dispatch(GetVehicles(navigate, 1, 8));
  } catch (e) {
    failureNotifier('failed to platform', e?.response?.data?.message);
  }
};
export const updatePrice = async (navigate, dispatch, code, value) => {
  try {
    const updateMemer = await api.put('memerr', {
      memerrCode: code,
      price: value,
    });
    successNotifier(updateMemer?.data?.message);
    dispatch(GetVehicles(navigate, 1, 8));
  } catch (e) {
    failureNotifier('failed to platform', e?.response?.data?.message);
  }
};
export const GetOrderDetail = async (
  dispatch,
  selectedCampaign,
  startDate,
  endDate
) => {
  try {
    const queryParams = new URLSearchParams();
    // console.log(selectedCampaign);

    queryParams.append('startDate', moment(startDate).format('YYYY-MM-DD'));
    queryParams.append('endDate', moment(endDate).format('YYYY-MM-DD'));
    // console.log(selectedCampaign);
    // if (selectedCampaign !== 'All Campaigns') {
    //   // console.log(selectedCampaign + 'clicked');
    //   queryParams.append('campaignCode', selectedCampaign);
    // }
    // console.log('indise');
    const url = `/?${queryParams.toString()}`;
    console.log(url);
    const memerData = await api.get(`user/order/ordersBetweenDates${url}`);
    dispatch(addReportData(memerData?.data));
    let string = '';
    if (memerData?.data?.result.length === 0) {
      string = 'No data to show';
    }
    successNotifier('fetched successfully' + ' ' + string);
    return memerData;
  } catch (e) {
    // failureNotifier('failed to get', e?.response?.data?.message);
  }
};

export const updateOrderHandler = async (id,  bookingDate,
                  returnDate,
                  status,
                  fare,
                  distance,
                  vehicleId,
                  customerId,
                  driver,
                  manager,
                  dispatch) => {
  try {
    const data = await api.put(`user/order/${id}`,{
    bookingDate,
    returnDate,
    status,
    fare,
    distance,
    vehicle:{
       id:vehicleId
    },
    driver: {
        id: driver
    },
    customer: {
        id: customerId
    },
    manager: {
        id: manager
    },
     rating: null
});
    successNotifier(data?.message);
    dispatch(GetCampaign());
  } catch (e) {
    failureNotifier('failed to create', e?.response?.data?.message);
  }
};


export const deleteOrderHandler = async (id,dispatch)=>{
  try {
    const data = await api.delete(`user/order/${id}`);
    successNotifier(data?.data?.message);
    dispatch(GetCampaign());
  } catch (e) {
    failureNotifier('failed to create', e?.response?.data?.message);
  }
}
