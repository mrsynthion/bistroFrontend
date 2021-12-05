import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ auth }: { auth: any }) => {
  const location = useLocation();
  useEffect(() => {
    console.log(auth);
  }, [auth]);
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};
export default PrivateRoute;
