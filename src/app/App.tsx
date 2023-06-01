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

import { PageAddInfoCoin, PageEditInfoCoin, PageProjectDetails } from './pages/ProjectDetails/Loadable';
import { CreateProject } from './pages/CreateProject/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { LoginPage, Telephone } from './pages/LoginPage/Loadable';
import PrivateRouter from 'routes/PrivateRouter';
import PublicRouter from 'routes/PublicRouter';
import { UpdateProject } from './pages/UpdateProject/Loadable';
import Loading from './components/Loading/Loading';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/slice/auth/selectors';
import { StackingPage, StakingCoinPage } from './pages/Stacking/Loadable';
import ModalAuthen from './components/Modal/ModalAuthen';
import { LoginByTelegram } from './pages/LoginPage/LoginByTelegram';
import { ProjectManagement } from './pages/TransactionManagement';
import { InvestorManagement } from './pages/InvestorManagement';
import { Profile } from './pages/Profile/Loadable';
import {
  DetailRequestPlusMoney,
  DetailRequestRecharge,
  DetailRequestPlus,
  DetailRequestDeduction,
  DetailRequestWithdraw,
  DetailRequestdeduction,
  Recharge,
  Withdraw,
  WithdrawGame,
} from './pages/AdminApprovesRequest/Loadable';
import FilterRequestProvider from './pages/AdminApprovesRequest/components/FilterContext/FilterRechargeProvider';
import { Helmet } from 'react-helmet-async';
import { images } from 'assets/images';
import {
  DetailHistoryRequestUserManagement,
  EntrySearchUser,
  HistoryRequestUserManagement,
  SimpleUserInformation,
  VolatilityBalance,
} from './pages/UserManagement/Loadable';
import { BankManagement } from './pages/BankManagement/Loadable';
import ModalSystemError from './components/Modal/ModalSystemError';
import { selectSystemError } from 'store/slice/system/selector';
import { BalanceFunctuations, TransactionDetails } from './pages/BalanceFluctuations/Loadable';
import { FilterCardProvider } from './components/AdminFilterTransaction/filterCard';
import FilterWithdrawProvider from './pages/AdminApprovesRequest/components/FilterContext/FilterWithdrawProvider';
import FilterPlusProvider from './pages/AdminApprovesRequest/components/FilterContext/FilterPlusProvider';
import FilterDeductionProvider from './pages/AdminApprovesRequest/components/FilterContext/FilterDeductionProvider';
import FilterWithdrawGameProvider from './pages/AdminApprovesRequest/components/FilterContext/FilterWithdrawGameProvider';

export function App() {
  const { isLoading, isAuthen } = useSelector(selectAuth);
  const systemError = useSelector(selectSystemError);

  return (
    <>
      <ModalAuthen isOpen={isAuthen} />
      <ModalSystemError isOpen={systemError} />
      <Helmet>
        <meta name="description" content="A Boilerplate application homepage" />
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
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
            <Route path="project-details/:projectId" element={<PageProjectDetails />} />
            <Route path="add-Infocoin/:projectId" element={<PageAddInfoCoin />} />
            <Route path="edit-Infocoin/:projectId" element={<PageEditInfoCoin />} />
            <Route path="/add" element={<CreateProject />} />
            <Route path="/edit/:projectId" element={<UpdateProject />} />
            <Route path="/stacking/usdt/:projectId" element={<StackingPage />} />
            <Route path="/stacking/coin/:projectId" element={<StakingCoinPage />} />
            <Route
              path="/balance-fluctuations"
              element={
                <FilterCardProvider>
                  <BalanceFunctuations />
                </FilterCardProvider>
              }
            />

            <Route
              path="/approves-recharge"
              element={
                <FilterRequestProvider>
                  <Recharge />
                </FilterRequestProvider>
              }
            />
            <Route path="/approves-recharge/detail/:requestId" element={<DetailRequestRecharge />} />
            <Route path="/request-plus/detail/:requestId" element={<DetailRequestPlus />} />
            <Route path="/balance-fluctuations/detail/:requestId" element={<TransactionDetails />} />

            <Route path="/approves-withdraw/detail/:requestId" element={<DetailRequestWithdraw />} />
            <Route path="/request-deduction/detail/:requestId" element={<DetailRequestDeduction />} />

            <Route
              path="/approves-withdraw"
              element={
                <FilterWithdrawProvider>
                  <Withdraw />
                </FilterWithdrawProvider>
              }
            />

            <Route
              path="/approves-withdraw-game"
              element={
                <FilterWithdrawGameProvider>
                  <WithdrawGame />
                </FilterWithdrawGameProvider>
              }
            />

            <Route path="/project-management" element={<ProjectManagement />} />
            <Route path="/bank-management" element={<BankManagement />} />

            {/* plus */}
            <Route
              path="/request-plus"
              element={
                <FilterPlusProvider>
                  <DetailRequestPlusMoney />
                </FilterPlusProvider>
              }
            />

            <Route
              path="/request-deduction"
              element={
                <FilterDeductionProvider>
                  <DetailRequestdeduction />
                </FilterDeductionProvider>
              }
            />

            {/* end plus */}
            <Route path="/investor" element={<InvestorManagement />} />

            {/* Profile */}
            <Route path="profile" element={<Profile />} />

            {/* User management */}
            <Route path="/user-management" element={<EntrySearchUser />} />
            <Route path="/user-management/info" element={<SimpleUserInformation />} />
            <Route path="/user-management/volatility" element={<VolatilityBalance />} />
            <Route path="/user-management/history" element={<HistoryRequestUserManagement />} />
            <Route path="/user-management/history/detail/:requestId" element={<DetailHistoryRequestUserManagement />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
