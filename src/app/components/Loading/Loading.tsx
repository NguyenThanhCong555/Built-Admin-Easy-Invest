import { createPortal } from 'react-dom';
import React, { memo, useEffect } from 'react';
import { Center, createStyles } from '@mantine/core';

import Loader from '../Loader/Loader';
import { useDispatch } from 'react-redux';
import { authActions } from 'store/slice/auth';

interface Props {
  visible?: boolean;
}
const Loading = memo(({ visible }: Props) => {
  const dispatch = useDispatch();
  // Local
  const { classes } = makeStyles();

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      dispatch(authActions.resetIsLoading());
      // Thêm reset loading từ store khác nếu có
    }, 5000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;
  return createPortal(
    <Center className={classes.overlay}>
      <Loader />
    </Center>,
    document.body,
  );
});
export default Loading;

const makeStyles = createStyles(() => ({
  overlay: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    inset: 0,
    zIndex: 99999,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
}));
