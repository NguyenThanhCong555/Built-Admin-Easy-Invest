/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import * as React from 'react';

import { Routes, Route } from 'react-router-dom';

import Wrapper from './components/Wrapper/Wrapper';
import { HomePage } from './pages/HomePage/Loadable';

import {
  PageAddInfoCoin,
  PageEditInfoCoin,
  PageProjectDetails,
} from './pages/ProjectDetails/Loadable';
import { CreateProject } from './pages/CreateProject/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { LoginPage, Telephone } from './pages/LoginPage/Loadable';
import PrivateRouter from 'routes/PrivateRouter';
import PublicRouter from 'routes/PublicRouter';
import { UpdateProject } from './pages/UpdateProject/Loadable';
import Loading from './components/Loading/Loading';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/slice/auth/selectors';
import { StackingPage } from './pages/Stacking/Loadable';
import ModalAuthen from './components/Modal/ModalAuthen';
import { LoginByTelegram } from './pages/LoginPage/LoginByTelegram';
import { TransactionManagement } from './pages/TransactionManagement';
import { Statistics } from './pages/Statistics';
import { InvestorManagement } from './pages/InvestorManagement';

export function App() {
  const { isLoading, isAuthen } = useSelector(selectAuth);
  return (
    <>
      <ModalAuthen isOpen={isAuthen} />
      <Loading visible={isLoading} />
      <Routes>
        <Route path="/login-telegram" element={<LoginByTelegram />} />
        <Route element={<PublicRouter />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/telephone" element={<Telephone />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route element={<Wrapper />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="project-details/:projectId"
              element={<PageProjectDetails />}
            />
            <Route
              path="add-Infocoin/:projectId"
              element={<PageAddInfoCoin />}
            />
            <Route
              path="edit-Infocoin/:projectId"
              element={<PageEditInfoCoin />}
            />
            <Route path="/add" element={<CreateProject />} />
            <Route path="/edit/:projectId" element={<UpdateProject />} />
            <Route path="/stacking/:projectId" element={<StackingPage />} />

            <Route path="/transaction" element={<TransactionManagement />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="/investor" element={<InvestorManagement />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
