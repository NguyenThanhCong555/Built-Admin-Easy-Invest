import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Flex, Group, Text, createStyles } from '@mantine/core';

import { images } from 'assets/images';
import { LoginLayout } from './components/Layout/LoginLayout';
import Languages from './components/Languages/Languages';
import { useDispatch } from 'react-redux';
import { authActions } from 'store/slice/auth';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Local
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const mobile = useMediaQuery('(max-width: 768px)');
  // Function
  const handleLoginByOtp = () => {
    dispatch(authActions.requestLoginByTelegram());
  };
  const [opened, setOpened] = React.useState<boolean>(false);
  return (
    <>
      <Helmet>
        <title>LoginPage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <LoginLayout>
        <Box className={classes.languages}>
          <Languages />
        </Box>
        <Group className={classes.loginGroup}>
          <Flex className={classes.loginBtn} onClick={handleLoginByOtp}>
            <Avatar src={images.telegram} className={classes.loginIcon} />
            <Text className={mobile ? 'body_1-bold' : 'subtitle_4-bold'}>
              {t('Login.Sign in with Telegram')}
            </Text>
          </Flex>
          <Flex
            className={classes.loginBtn}
            onClick={() => navigate('/telephone')}
          >
            <Avatar src={images.otpCode} className={classes.loginIcon} />
            <Text className={mobile ? 'body_1-bold' : 'subtitle_4-bold'}>
              {t('Login.Sign in with OTP code')}
            </Text>
          </Flex>
        </Group>
      </LoginLayout>
      {/*  */}
    </>
  );
};

const makeStyles = createStyles(() => ({
  loginGroup: {
    gap: 18,
  },

  loginBtn: {
    gap: 8,
    height: 76,
    width: '100%',
    color: 'var(--white)',
    padding: '8px',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: 'var(--primary-1)',
    cursor: 'pointer',
  },
  loginIcon: {
    width: 68,
    height: 68,
    borderRadius: '50%',
    border: '1px solid var(--white)',
  },
  languages: {
    position: 'absolute',
    right: 0,
    borderRadius: 8,
    boxShadow: 'var(--shadow)',
  },
}));
