import { Navigate, Outlet } from 'react-router-dom';

import useAdminCheck from '@dumps/api-hooks/auth/useAdminCheck';
import Layout from '@dumps/components/layouts/Layout';
import LoadingSpinner from '@dumps/components/loadingSpinner';

export default function AdminGuard() {
  const { isAdmin, isLoading } = useAdminCheck();

  if (isLoading) {
    // Show a loading spinner or placeholder while checking admin status
    return <LoadingSpinner />;
  }

  if (!isAdmin) {
    // Redirect to login or unauthorized page if the user is not an admin
    return <Navigate to="/" />;
  }

  // Render the protected route content
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
