import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectAuth } from 'store/slice/auth/selectors';

function PrivateRouter() {
  const { isLogin } = useSelector(selectAuth);
  return isLogin ? <Outlet /> : <Navigate to="/" />;
}
export default PrivateRouter;
