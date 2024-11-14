import { useRoutes } from 'react-router-dom';
import { NAVIGATION_ROUTES } from './routes.constant';
import Dashboard from '@dumps/pages/Dashboard/index';
import Layout from '@dumps/components/layouts/Layout';
import Login from '@dumps/pages/Login/Login';
import ButtonGroup from '@dumps/pages/Components/Buttons';
import FormFields from '@dumps/pages/Components/FormFields';
import Register from '@dumps/pages/Register/Register';
import Dump from '@dumps/pages/Dump/dump';
import Bundles from '@dumps/pages/Bundle/bundles';
import ManageDump from '@dumps/pages/ManageDump';
import ManageBundle from '@dumps/pages/ManageBundle/manageBundle';

const routes = [
  {
    path: NAVIGATION_ROUTES.DASHBOARD,
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.FORM_FIELD,
    element: (
      <Layout>
        <FormFields />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.BUTTON,
    element: (
      <Layout>
        <ButtonGroup />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: NAVIGATION_ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: NAVIGATION_ROUTES.DUMPS,
    element: (
      <Layout>
        <Dump />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.DUMPS,
    element: (
      <Layout>
        <Dump />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.ADD_DUMPS,
    element: (
      <Layout>
        <ManageDump />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.EDIT_DUMPS,
    element: (
      <Layout>
        <ManageDump />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.BUNDLES,
    element: (
      <Layout>
        <Bundles />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.ADD_BUNDLE,
    element: (
      <Layout>
        <ManageBundle />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.EDIT_BUNDLE,
    element: (
      <Layout>
        <ManageBundle />
      </Layout>
    ),
  },
];
// const protectedRoutes = [];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
