import { Box, Group, Modal, Text, TextInput, createStyles } from '@mantine/core';
import { FilledButton } from 'app/components/Button/FilledButton';
import { Frame } from 'app/layouts/Frame';
import { RESPONSE_SUCCESS_ERROR } from 'constants/common';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usersActions } from 'store/slice/users';
import { RESPONSE_ERROR_NOT_EXPIRES_ACCOUNT } from 'store/slice/users/response';
import { selectErrorOfUsers } from 'store/slice/users/selector';
import { variable } from 'styles/variable';

import { ReactComponent as IconXCircle } from 'assets/icons/modal/x-circle.svg';

type Props = {};

export const EntrySearchUser = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { classes } = useStyle();

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const InputPhoneNumberRef = useRef<HTMLInputElement>(null);
  const [errorEntry, setErrorEntry] = useState<boolean>(false);
  const buttonSearchRef = useRef<HTMLButtonElement>(null);

  const responseErrorUser = useSelector(selectErrorOfUsers);

  useEffect(() => {
    if (responseErrorUser === RESPONSE_SUCCESS_ERROR) {
      dispatch(usersActions.resetResponseErrorOfUsers());
      navigation('info');
    }
  }, [responseErrorUser]);

  const moveToHomePage = () => {
    navigation('/');
  };

  function handleCheckInput(e) {
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = newValue;
  }

  const handleChangePhoneNumber = event => {
    const value = event.target.value;
    setPhoneNumber(value);
  };

  const handleHadError = () => {
    setErrorEntry(true);

    if (InputPhoneNumberRef.current) InputPhoneNumberRef.current.focus();
  };

  const handleOnKeyDown = e => {
    if (e.keyCode === 13 && buttonSearchRef.current) {
      buttonSearchRef.current.click();
    }
  };

  const handleSearchPhoneNumber = () => {
    if (phoneNumber.length < 9 || phoneNumber.length > 11) {
      handleHadError();
      return;
    }
    if (!phoneNumber.startsWith('0') && !phoneNumber.startsWith('8')) {
      handleHadError();
      return;
    }
    if (phoneNumber.startsWith('8') && !phoneNumber.startsWith('4', 1)) {
      handleHadError();
      return;
    }

    //convert number
    let newPhoneNumber = '';
    if (phoneNumber.startsWith('0')) {
      newPhoneNumber = '84' + phoneNumber.slice(1);
    } else {
      newPhoneNumber = phoneNumber;
    }

    setErrorEntry(false);
    dispatch(usersActions.requestGetUserInformation({ phoneNumber: newPhoneNumber }));
  };

  return (
    <>
      <Frame onMovePage={moveToHomePage} titlePage={t('UserManagement.titlePageSearch')}>
        <Box px={16} mt={14}>
          <Text align="center" className="body_6-regular">
            {t('UserManagement.searchUser')}
          </Text>

          <Text mt={10} mb={4} className="body_4-bold">
            {t('UserManagement.phoneNumber')}
          </Text>
          <TextInput
            placeholder={t('UserManagement.placeholder')}
            value={phoneNumber}
            onChange={event => handleChangePhoneNumber(event)}
            onInput={e => handleCheckInput(e)}
            onKeyDown={e => handleOnKeyDown(e)}
            classNames={{ root: classes.groupInputNumber, input: classes.textInputPayId }}
            ref={InputPhoneNumberRef}
          />
          {/* limit error*/}
          {errorEntry && (
            <Text className="small_3-regular" c={variable.secondary.secondary2}>
              {t('UserManagement.errorEntryPhoneNumber')}
            </Text>
          )}
        </Box>

        <Group className={classes.groupButtonContinue}>
          <FilledButton ref={buttonSearchRef} onClick={handleSearchPhoneNumber} w="100%" h={44}>
            {t('UserManagement.buttonSearch')}
          </FilledButton>
        </Group>
      </Frame>

      <Modal
        opened={responseErrorUser === RESPONSE_ERROR_NOT_EXPIRES_ACCOUNT}
        onClose={() => dispatch(usersActions.resetResponseErrorOfUsers())}
        centered
        // closeButtonProps={<IconXCircle />}
        withCloseButton={false}
      >
        <Group position="right" mb={5}>
          <IconXCircle onClick={() => dispatch(usersActions.resetResponseErrorOfUsers())} />
        </Group>
        <Text align="center" className="small_3-regular">
          {t('UserManagement.popupContent')}
        </Text>
        <FilledButton onClick={() => dispatch(usersActions.resetResponseErrorOfUsers())} w={'100%'} mt={16}>
          {t('UserManagement.buttonUnderstand')}
        </FilledButton>
      </Modal>
    </>
  );
};

const useStyle = createStyles(theme => ({
  groupInputNumber: {
    width: '100%',
  },
  textInputPayId: {
    height: '44px',
    width: '100%',
    padding: '0 16px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 400,
    '&:focus': {
      border: `1px solid #929292`,
    },
  },

  groupButtonContinue: {
    width: '100%',
    padding: '10px 16px',
    marginTop: '40px',

    '@media (max-width : 576px)': {
      position: 'fixed',
      bottom: 0,
      left: 0,
      background: variable.neutral.whiteLight,
    },
  },
}));
