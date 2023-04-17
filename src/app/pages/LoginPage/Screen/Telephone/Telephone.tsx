import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Center, Flex, Group, Stack, Text, createStyles } from '@mantine/core';

import { authActions } from 'store/slice/auth';
import Country from '../../components/Country/Country';
import { selectAuth } from 'store/slice/auth/selectors';
import OtpInput from '../../components/OtpInput/OtpInput';
import { clearZeroNumber } from 'utils/helpers/clearZeroNumber';
import { LoginLayout } from '../../components/Layout/LoginLayout';
import { FilledButton } from 'app/components/Button/FilledButton';
import { SubtleButton } from 'app/components/Button/SubtleButton';
import { ReactComponent as Arrow } from 'assets/icons/loginPage/arrow-narrow-left.svg';

export const Telephone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useSelector(selectAuth);
  // Local
  const { t } = useTranslation();
  const { cx, classes } = makeStyles();

  // State
  const [phone, setPhone] = useState<string>('');
  const [code, setCode] = useState<number>(84);

  // Function
  const handleGetOtp = () => {
    dispatch(authActions.requestGetOtp(code + clearZeroNumber(phone)));
  };

  function handleChangePhone(event: React.ChangeEvent<HTMLInputElement>) {
    setPhone(event.target.value);
  }

  const handleOnKeyDown = e => {
    if ([37, 38, 39, 40].indexOf(e.which) > -1) {
      e.preventDefault();
    }
  };
  const handleFocus = () => {
    if (login.error !== -1) {
      dispatch(authActions.resetLogin());
    }
  };

  useEffect(() => {
    return () => {
      if (login.error !== -1) {
        dispatch(authActions.resetLogin());
      }
    };
  }, []);
  return (
    <LoginLayout>
      <SubtleButton className={classes.backBtn} onClick={() => navigate('/')}>
        <Arrow />
      </SubtleButton>
      <Stack className={classes.content}>
        <Flex className={classes.telephone}>
          <Country onCode={setCode} />
          <Center className={classes.areaCode}>
            <Text className="body_6-regular">+{code}</Text>
          </Center>
          <input
            type="number"
            value={phone}
            onChange={handleChangePhone}
            onKeyDown={e => handleOnKeyDown(e)}
            onFocus={handleFocus}
            className={cx(
              'body_2-medium',
              classes.input,
              login.error === 5 ? 'error' : '',
            )}
            placeholder={t('Login.Enter your phone number')}
          />
        </Flex>
        {login.error === 0 || login.error === 12 || login.error === 10 ? (
          <OtpInput
            phone={code + clearZeroNumber(phone)}
            onSendBack={handleGetOtp}
          />
        ) : (
          <>
            <Text
              className={cx(
                'small_3-regular',
                classes.tutorial,
                login.error === 5 ? 'error' : '',
              )}
            >
              {login.error === 5
                ? t('Login.Incorrect phone number')
                : phone
                ? t('Login.Please enter your registered phone number')
                : ''}
            </Text>
            <Group className={classes.groupBtn}>
              <FilledButton className={classes.getBtn} onClick={handleGetOtp}>
                {t('Login.Get OTP code')}
              </FilledButton>
            </Group>
          </>
        )}
      </Stack>
    </LoginLayout>
  );
};

const makeStyles = createStyles(() => ({
  backBtn: {
    position: 'absolute',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  telephone: {
    gap: 0,
    height: 48,
    width: '100%',
    borderRadius: 8,
    border: '1px solid var(--grey-dark)',
  },
  areaCode: {
    width: 50,
    height: '100%',
    color: 'var(--grey-dark)',
  },
  rootInput: {
    flex: 1,
    height: '100%',
  },
  wrapperInput: {
    height: '100%',
  },
  input: {
    padding: 0,
    flex: 1,
    height: '100%',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    '&.error': {
      color: 'var(--secondary-2)',
    },
  },
  tutorial: {
    height: 22,
    color: 'var(--grey-dark)',
    '&.error': {
      color: 'var(--secondary-2)',
    },
  },
  groupBtn: {
    width: '100%',
    paddingTop: 38,
    justifyContent: 'center',
  },
  getBtn: {
    height: 52,
  },
}));
