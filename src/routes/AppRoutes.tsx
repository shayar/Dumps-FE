import { useRoutes } from 'react-router-dom';
import { NAVIGATION_ROUTES } from './routes.constant';
import Dashboard from '@dumps/pages/Dashboard/index';
import Layout from '@dumps/components/layouts/Layout';
import Login from '@dumps/pages/Login/Login';
import ButtonGroup from '@dumps/pages/Components/Buttons';
import FormFields from '@dumps/pages/Components/FormFields';
// import Dashboard from "@dumps/pages/Dashboard";

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
];
// const protectedRoutes = [];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
