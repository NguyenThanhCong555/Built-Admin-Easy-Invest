import React from 'react';
import { useDispatch } from 'react-redux';
import { Flex, Modal, Text, createStyles } from '@mantine/core';

import { authActions } from 'store/slice/auth';
import { OutlineButton } from '../Button/OutlineButton';
import { useTranslation } from 'react-i18next';
import { FilledButton } from '../Button/FilledButton';
import { systemActions } from 'store/slice/system';

interface Props {
  isOpen: boolean;
}
const ModalSystemError = ({ isOpen }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { classes } = makeStyles();

  const handleCloseModal = () => {
    dispatch(systemActions.resetSystemError());
  };

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={() => handleCloseModal()}
      title={'Đang có sự cố xẩy ra vui lòng thử lại'}
      zIndex={99999999}
    ></Modal>
  );
};

export default ModalSystemError;
const makeStyles = createStyles(() => ({
  title: {
    fontSize: 18,
    fontWeight: 600,
    textAlign: 'center',
  },
  group: {
    gap: 12,
    width: '100%',
  },
  optionsBtn: {
    width: '50%',
  },
  closeModal: {
    display: 'none',
  },
  headerModal: {
    padding: '20px 0px',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
  innerModal: {
    zIndex: 9999,
  },
}));
