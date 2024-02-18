import api from "../../services/backendApi";
import { failureNotifier, successNotifier } from "../notifications";

export const GetCountDetail = async (
  dispatch,
  routePath,
  dispatchMethod
) => {
  try {

    const Data = await api.get(`${routePath}`);
    console.log(Data)
    dispatch(dispatchMethod(Data?.data));
    let string = '';
    if (Data?.data?.length === 0) {
      string = 'No data to show';
    }

    successNotifier('fetched successfully' + ' ' + string);
    // return memerData;

  } catch (e) {
    failureNotifier('failed to get', e?.response?.data?.message);
  }
};