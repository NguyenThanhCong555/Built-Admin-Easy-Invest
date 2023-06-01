import { Modal } from '@mantine/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from 'store/slice/auth';

interface ModalLockAccountProps {
  opened: boolean;
  type: 0 | 1;
}

const ModalLockAccount = ({ opened, type }: ModalLockAccountProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 0 - login by otp
  // 1 - login by link

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => {
        if (type === 0) {
          dispatch(authActions.resetLogin());
        } else {
          dispatch(authActions.resetResponseLoginTelegram());
          navigate('/login');
        }
      }}
    >
      Tài khoản của bạn đã bị khóa
    </Modal>
  );
};

export default ModalLockAccount;
