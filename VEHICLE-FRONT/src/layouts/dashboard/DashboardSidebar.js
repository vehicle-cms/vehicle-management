import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@mui/material';
// mocks_
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 224;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');
  const Navigate = useNavigate();
  const username = localStorage.getItem("username")
  const auth =localStorage.getItem("authorize");
  const getIcon = name => <Iconify icon={name} width={22} height={22} />;

  const [sidebardata,setData] = useState([]);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(()=>{
         if(auth==="CUSTOMER"){
              setData([
                  {
                    title: 'My Profile',
                    path: '/dashboard/myprofile',
                    icon: getIcon('eva:people-fill'),
                  },
                  {
                    title: 'Orders',
                    path: '/dashboard/orders',
                    icon: getIcon('icon-park:transaction-order'),
                  }
                ])
         }else{
                setData([
                  {
                    title: 'Managers',
                    path: '/dashboard/managers',
                    icon: getIcon('eva:people-fill'),
                  },
                  {
                    title: 'Vehicles',
                    path: '/dashboard/vehicles',
                    icon: getIcon('icon-park:engineering-vehicle'),
                  },
                  {
                    title: 'Drivers',
                    path: '/dashboard/drivers',
                    icon: getIcon('eva:people-fill'),
                  },
                  {
                    title: 'Orders',
                    path: '/dashboard/orders',
                    icon: getIcon('icon-park:transaction-order'),
                  },
                  {
                    title: 'Maintenance',
                    path: '/dashboard/maintenance',
                    icon: getIcon('bi:tools'),
                  },
                  {
                    title: 'Customers',
                    path: '/dashboard/customers',
                    icon: getIcon('eva:people-fill'),
                  }])
         }
  },[auth])

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{ mb: 5, mx: 2.5, mt: 5 }}
        onClick={() => {
          Navigate('/dashboard/app');
        }}
      >
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {username ? username : 'unknown'}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary' }}
              ></Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebardata}/>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
