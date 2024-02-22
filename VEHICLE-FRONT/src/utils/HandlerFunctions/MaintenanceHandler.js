import api from '../../services/backendApi';
import { LogoutHandler } from './AdminHandler';
import { failureNotifier, successNotifier } from '../notifications';
import { GetPlatforms, addPlatform } from '../../Actions/MaintenanceActions';
import moment from 'moment';

export const updateStatus = async (navigate, dispatch, code, value) => {
  try {
    const updateMemer = await api.put('memerr', {
      memerrCode: code,
      isNotActive: value,
    });
    successNotifier(updateMemer?.data?.message);
    dispatch(GetPlatforms(navigate, 1, 8));
  } catch (e) {
    failureNotifier('failed to platform', e?.response?.data?.message);
  }
};


export const deleteMaintenanceHandler = async (id,dispatch)=>{
  try {
    const data = await api.delete(`user/maintenance/${id}`);
    successNotifier(data?.data?.message);
    dispatch(GetPlatforms());
  } catch (e) {
    failureNotifier('failed to delete', e?.response?.data?.message);
  }
}
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
    dispatch(addPlatform(memerData?.data));
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

export const loadMoreData = async (
  page,
  pageSize,
  setPage,
  loading,
  setLoading,
  route,
  data,
  setData,
  setData1,
  dispatch,
  dispatchFunction,
  navigate
) => {
  if (loading) {
    return;
  }
  setPage(page + 1);

   const queryParams = new URLSearchParams();

   queryParams.append('pageNumber', page);

   const url = `${route}?${queryParams.toString()}`;
  setLoading(true);

  try {
    const getData = await api.get(url);

    if (getData?.data?.length > 0) {
      setData([...data, ...getData?.data]);
      setData1([...data, ...getData?.data]);
      dispatch(dispatchFunction([...data, ...getData?.data]));
      setLoading(false);
    } else {
      setData1([]);
      setLoading(false);
    }
  } catch (e) {
    if (e?.response?.status === 401) {
      LogoutHandler(navigate);
    }
    setLoading(false);
  }
};
