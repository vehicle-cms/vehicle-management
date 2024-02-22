import api from '../../services/backendApi';
import { LogoutHandler } from './AdminHandler';
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
