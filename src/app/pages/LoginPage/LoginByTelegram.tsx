import { LoadingOverlay, Modal } from '@mantine/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authActions } from 'store/slice/auth';
import {
  selectErrorLoginTelegram,
  selectIsLogin,
} from 'store/slice/auth/selectors';
import { Navigate } from 'react-router-dom';
import {
  RESPONSE_ERROR_EXPIRED_OTP,
  RESPONSE_ERROR_INVALID_OTP,
} from 'constants/account';
import { FailPopup } from 'app/components/Popup/Fail';
import { RESPONSE_DEFAULT_ERROR } from 'constants/common';

type Props = {};

export const LoginByTelegram = (props: Props) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();

  const queryId = searchParams.get('id');
  const queryToken = searchParams.get('token');
  const isLogin = useSelector(selectIsLogin);
  const responseErrorUser = useSelector(selectErrorLoginTelegram);

  useEffect(() => {
    if (queryToken && queryId) {
      dispatch(
        authActions.requestLoginDirectlyTelegram({
          id: queryId,
          token: queryToken,
        }),
      );
    }
  }, []);

  return (
    <>
      {isLogin === true && <Navigate to={'/'} replace={true} />}

      {responseErrorUser === RESPONSE_DEFAULT_ERROR && (
        <LoadingOverlay visible={!isLogin} overlayBlur={2} />
      )}

      <Modal
        centered
        opened={responseErrorUser === RESPONSE_ERROR_EXPIRED_OTP}
        onClose={() => {
          dispatch(authActions.resetResponseLoginTelegram());
          navigation('/login');
        }}
      >
        <FailPopup title="Link đã hết hạn!" />
      </Modal>

      <Modal
        centered
        opened={
          responseErrorUser !== RESPONSE_ERROR_EXPIRED_OTP &&
          responseErrorUser !== RESPONSE_DEFAULT_ERROR
        }
        onClose={() => {
          dispatch(authActions.resetResponseLoginTelegram());
          navigation('/login');
        }}
      >
        <FailPopup title="Vui lòng đăng nhập !" />
      </Modal>
    </>
  );
};
