import {
  BundleIcon,
  DashboardIcon,
  DumpIcon,
  LogoutIcon,
} from '@dumps/assets/svgs';
import { NAVIGATION_ROUTES } from '@dumps/routes/routes.constant';

const navItems = [
  {
    name: 'Dashboard',
    to: NAVIGATION_ROUTES.DASHBOARD,
    icon: DashboardIcon,
    // Sometime you will have to disable some view to the user
    // this visible boolean will be used in such scenario
    // TODO: needs discussion if this is actually good approach or
    visible: true,
  },
  {
    name: 'Hidden Page',
    to: NAVIGATION_ROUTES.DASHBOARD,
    icon: DashboardIcon,
    // Sometime you will have to disable some view to the user
    // this visible boolean will be used in such scenario
    // TODO: needs discussion if this is actually good approach or
    visible: false,
  },
  {
    name: 'Dumps',
    to: NAVIGATION_ROUTES.DUMPS,
    icon: DumpIcon,
    visible: true,
  },
  {
    name: 'Bundles',
    to: NAVIGATION_ROUTES.BUNDLES,
    icon: BundleIcon,
    visible: true,
  },
  {
    name: 'Components',
    to: '',
    icon: DashboardIcon,
    visible: true,
    child: [
      {
        name: 'Button',
        to: NAVIGATION_ROUTES.BUTTON,
        icon: DashboardIcon,
        visible: true,
      },
      {
        name: 'Form',
        to: NAVIGATION_ROUTES.FORM_FIELD,
        icon: DashboardIcon,
        visible: true,
      },
    ],
  },
  {
    name: 'Logout',
    to: NAVIGATION_ROUTES.LOGIN,
    icon: LogoutIcon,
    visible: true,
  },
];

export { navItems };
