import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import NotFound from './pages/Page404';

import Memer from './pages/Vehicles';
import Campaign from './pages/Orders';
import ResetPassword from './pages/ResetPassword';
import Register from './pages/Register'
import MyProfile from './pages/MyProfile';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'vehicles', element: <Memer /> },
        { path: 'orders', element: <Campaign /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'register', element: <Register/> },
        { path: 'myprofile', element: <MyProfile/> }
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        // { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
