import { Container, Stack, createStyles } from '@mantine/core';
import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import { media } from 'styles/media';

const Wrapper = () => {
  const { classes } = makeStyles();
  return (
    <Stack className={classes.container}>
      <Header />
      <Container fluid className={classes.content}>
        <Outlet />
      </Container>
    </Stack>
  );
};

export default Wrapper;

const makeStyles = createStyles(() => ({
  container: {
    width: '100vw',
    overflow: 'hidden',
  },
  content: {
    width: '100%',
    height: '100%',
    padding: '72px 0px 0px',
  },
}));
