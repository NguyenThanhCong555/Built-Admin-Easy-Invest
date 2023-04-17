import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectAuth } from 'store/slice/auth/selectors';

function PublicRouter() {
  const { isLogin } = useSelector(selectAuth);
  return isLogin ? <Navigate to="/home" /> : <Outlet />;
}
export default PublicRouter;
