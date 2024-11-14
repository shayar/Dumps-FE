import { Outlet, useRoutes } from 'react-router-dom';
import { NAVIGATION_ROUTES } from './routes.constant';
import Dashboard from '@dumps/pages/Admin/Dashboard/index';
import Layout from '@dumps/components/layouts/Layout';
import Login from '@dumps/pages/Login/Login';
import Register from '@dumps/pages/Register/Register';
import Dump from '@dumps/pages/Admin/Dump/dump';
import Bundles from '@dumps/pages/Admin/Bundle/bundles';
import ManageDump from '@dumps/pages/Admin/ManageDump';
import ManageBundle from '@dumps/pages/Admin/ManageBundle/manageBundle';
import Home from '@dumps/pages/User/Home/home';
import MainLayout from '@dumps/pages/User/MainLayout/mainLayout';
import Products from '@dumps/pages/Products/products';

const routes = [
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: NAVIGATION_ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: '/admin',
    element: (
      <Layout>
        <Outlet></Outlet>
      </Layout>
    ),
    children: [
      {
        path: NAVIGATION_ROUTES.ADMIN.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN.DUMPS,
        element: <Dump />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN.ADD_DUMPS,
        element: <ManageDump />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN.EDIT_DUMPS,
        element: <ManageDump />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN.BUNDLES,
        element: <Bundles />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN.ADD_BUNDLE,
        element: <ManageBundle />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN.EDIT_DUMPS,
        element: <ManageBundle />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <MainLayout>
        <Outlet></Outlet>
      </MainLayout>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: NAVIGATION_ROUTES.PRODUCTS,
        element: <Products />
      }
    ],
  },
];
// const protectedRoutes = [];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
