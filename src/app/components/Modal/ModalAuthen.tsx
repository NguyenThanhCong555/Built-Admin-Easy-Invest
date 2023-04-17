import React from 'react';
import { useDispatch } from 'react-redux';
import { Flex, Modal, Text, createStyles } from '@mantine/core';

import { authActions } from 'store/slice/auth';
import { OutlineButton } from '../Button/OutlineButton';
import { useTranslation } from 'react-i18next';
import { FilledButton } from '../Button/FilledButton';

interface Props {
  isOpen: boolean;
}
const ModalAuthen = ({ isOpen }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { classes } = makeStyles();

  const handleCloseModal = () => {
    dispatch(authActions.resetIsAuthen());
  };
  const handleLogout = () => {
    dispatch(authActions.logoutSuccess());
  };
  return (
    <Modal
      centered
      opened={isOpen}
      onClose={() => handleCloseModal()}
      title={t('Header.You are not granted access!')}
      classNames={{
        inner: classes.innerModal,
        header: classes.headerModal,
        title: classes.headerTitle,
        close: classes.closeModal,
      }}
    >
      <Flex className={classes.group}>
        <OutlineButton
          className={classes.optionsBtn}
          onClick={() => handleCloseModal()}
        >
          {t('Header.Cancel')}
        </OutlineButton>
        <FilledButton
          className={classes.optionsBtn}
          onClick={() => handleLogout()}
        >
          {t('Header.Sign In')}
        </FilledButton>
      </Flex>
    </Modal>
  );
};

export default ModalAuthen;
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
