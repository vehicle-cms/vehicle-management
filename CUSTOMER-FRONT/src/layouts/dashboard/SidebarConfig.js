// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = name => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
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
];

export default sidebarConfig;
