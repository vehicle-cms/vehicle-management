// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import './styles/user.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Gateway from './sections/authentication';
import { GetCampaign, orderApprovedCount, orderCount, orderPendingCount, orderRejectedCount } from './Actions/OrderAction';
import { GetVehicles, vehicleActiveCount, vehicleCount, vehicleInActiveCount, vehicleMaintenanceCount } from './Actions/VehicleActions';
import { GetTags } from './Actions/CustomerActions';
import { useDispatch } from 'react-redux';
import { GetCountDetail }  from "./utils/HandlerFunctions/CountHandler";
import { GetAdmins, managerCount } from './Actions/ManagerActions';
// ----------------------------------------------------------------------

export default function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('admin');
  const dispatch = useDispatch();

  useEffect(() => {
    if (token !== 'undefined') {
      navigate('/dashboard/app');
    }
  }, [token]);

   useEffect(() => {
    dispatch(GetAdmins());
    dispatch(GetCampaign());
    dispatch(GetVehicles());
    dispatch(GetTags());

     GetCountDetail(
     dispatch,
    'vehicles/active-count',
     vehicleActiveCount);

     GetCountDetail(
     dispatch,
    'vehicles/inactive-count',
     vehicleInActiveCount);

     GetCountDetail(
     dispatch,
    'vehicles/maintenance-count',
     vehicleMaintenanceCount)

     GetCountDetail(
     dispatch,
    'user/manager/manager-count',
     managerCount)

      GetCountDetail(
     dispatch,
    'vehicles/vehicle-count',
     vehicleCount)

      GetCountDetail(
     dispatch,
    'user/order/order-count',
     orderCount)

       GetCountDetail(
     dispatch,
    'user/order/approved-count',
     orderApprovedCount)

       GetCountDetail(
     dispatch,
    'user/order/pending-count',
     orderPendingCount)

       GetCountDetail(
     dispatch,
    'user/order/rejected-count',
     orderRejectedCount)


  }, []);

  // if (token === 'undefined') {
  //   return (
  //     <>
  //       <Gateway />
  //     </>
  //   );
  // }
  // if (!token) {
  //   return (
  //     <>
  //       <Gateway />
  //     </>
  //   );
  // }

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <Router />
    </ThemeConfig>
  );
}
