import { Box, Button, Group, Modal, NativeSelect, Select, Stack, Text, TextInput, createStyles } from '@mantine/core';
import { Frame } from 'app/layouts/Frame';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { variable } from 'styles/variable';
import { dataChooseCoin } from './data';
import { FilledButton } from 'app/components/Button/FilledButton';

import { IconChevronDown } from '@tabler/icons-react';
import { ReactComponent as IconArrowDown } from 'assets/icons/arrow/caret-down-black.svg';
import { PopupPaymentConfirmation } from './components/PopupConfirmInfo';
import {
  selectErrorCreateRequest,
  selectListCoinUsdtOfUser,
  selectLoadingCreateRequest,
  selectUserInfo,
} from 'store/slice/users/selector';
import { useDisclosure } from '@mantine/hooks';
import { TCoinInfo } from 'store/slice/users/types';
import { usersActions } from 'store/slice/users';
import { requestCreateNewRequestPlusOrSubtract } from 'store/slice/users/request';
import { RESPONSE_SUCCESS_ERROR, SERVICE_RECHARGE_MONEY, SERVICE_WITHDRAW_MONEY } from 'constants/common';
import { ConfirmAskPopup } from 'app/components/Popup/ConfirmAskPoppup';
import { FailPopup } from 'app/components/Popup/Fail';

import { ReactComponent as IconSuccess } from 'assets/icons/modal/icon-success.svg';
import { RESPONSE_ENOUGH_REQUEST_WAITING, RESPONSE_INVALID_MIN_TRANSFER } from 'store/slice/users/response';
import ModalConfirm from 'app/components/Modal/ModalConfirm';
import { ReactComponent as XCircle } from 'assets/icons/modal/x-circle.svg';

type Props = {};

export const VolatilityBalance = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { classes } = useStyle();

  const [opened, { open, close }] = useDisclosure(false);
  const [openPopupSuccess, setOpenPopupSuccess] = useState<boolean>(false);
  const [coinAmount, setCoinAmount] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [coinId, setCoinId] = useState<string>('1');
  const [errorAmount, setErrorAmount] = useState<boolean>(false);
  const [errorReason, setErrorReason] = useState<boolean>(false);
  const [errorBalanceEnough, setErrorBalanceEnough] = useState<boolean>(false);

  const coinAmountRef = useRef<HTMLInputElement>(null);
  const reasonRef = useRef<HTMLInputElement>(null);

  const userInformation = useSelector(selectUserInfo);
  const listCoinUsdtOfUser = useSelector(selectListCoinUsdtOfUser);
  const loadingCreateRequest = useSelector(selectLoadingCreateRequest);
  const errorCreateRequest = useSelector(selectErrorCreateRequest);

  useEffect(() => {
    if (errorCreateRequest === RESPONSE_SUCCESS_ERROR) {
      // close popup confirm
      close();

      setOpenPopupSuccess(true);
    } else if (errorCreateRequest === RESPONSE_ENOUGH_REQUEST_WAITING) {
      // close popup confirm
      close();
    } else if (errorCreateRequest === 50) {
      // Not Balance enough
      close();
      setErrorBalanceEnough(true);
      dispatch(usersActions.setErrorCreateRequest({ error: -1 }));
    }
  }, [errorCreateRequest]);

  const callbackFilterToShowCoinName = useCallback((listCoins: TCoinInfo[]): { value: string; label: string }[] => {
    let newCoins: { value: string; label: string }[] = listCoins.map(coin => {
      return {
        value: String(coin.coin_id),
        label: coin.coin_name,
      };
    });

    const COIN_ID_USDT = '1';
    const COIN_NAME_USDT = 'USDT';
    newCoins.unshift({ value: COIN_ID_USDT, label: COIN_NAME_USDT });

    return newCoins;
  }, []);

  const dataListCoin = callbackFilterToShowCoinName(listCoinUsdtOfUser);
  console.log(dataListCoin);
  const moveTobackPage = () => {
    navigation(-1);
  };

  const onChangeCoinAmount = event => {
    const value = event.target.value;
    setCoinAmount(value);
  };

  function handleCheckInput(e) {
    const newValue = e.target.value.replace(/[^-0-9.]/g, '');
    e.target.value = newValue;
  }

  const handleChooseCoinAmount = (usdt: string) => {
    setCoinAmount(usdt);
  };
  const handleChangeReason = e => {
    const value = e.target.value;
    setReason(value);
  };

  const handleVolatilityBalanceOfUser = () => {
    setErrorAmount(false);
    setErrorReason(false);

    if (coinAmount === '' || isNaN(Number(coinAmount))) {
      setErrorAmount(true);
      if (coinAmountRef.current) coinAmountRef.current.focus();
      return;
    }
    if (reason.length === 0) {
      setErrorReason(true);
      if (reasonRef.current) reasonRef.current.focus();
      return;
    }
    console.log(coinId);
    open();
  };

  const handleChooseCoin = event => {
    setCoinId(event.target.value);
  };

  const handleCancelPopupSuccessCreateRequest = () => {
    dispatch(usersActions.resetErrorCreateRequest());
    setOpenPopupSuccess(false);
    setCoinAmount('');
    setCoinId('1');
    setReason('');
  };

  const moveToSeeHistory = () => {
    dispatch(usersActions.resetErrorCreateRequest());
    setOpenPopupSuccess(false);
    navigation('/user-management/history');
  };
  const submitConfirm = () => {
    if (!userInformation) return;

    const payload: requestCreateNewRequestPlusOrSubtract = {
      coin_id: Number(coinId),
      content: reason,
      exchange: Number(coinAmount),
      userid: userInformation?.userid,
    };

    if (Number(coinAmount) > 0) {
      payload.service = SERVICE_RECHARGE_MONEY;
      dispatch(usersActions.requestCreateRequestPlusBalance(payload));
    } else {
      payload.exchange = 0 - payload.exchange;
      payload.service = SERVICE_WITHDRAW_MONEY;
      dispatch(usersActions.requestCreateRequestSubtractBalance(payload));
    }
  };

  function handleCloseModalBalance() {
    setErrorBalanceEnough(false);
  }

  return (
    <>
      <Frame onMovePage={moveTobackPage} titlePage={t('UserManagement.walletInfor')}>
        <Box px={16} mt={14}>
          <Text align="center" className="body_6-regular">
            {t('UserManagement.buttonExchangeBalance')}
          </Text>

          <Text mt={10} mb={4} className="body_4-bold">
            {t('UserManagement.amount')}
          </Text>
          <Group
            noWrap
            className={classes.researchGroupInput}
            //   style={{ border: `1px solid ${errorRateState ? variable.secondary.secondary2 : variable.neutral.grey}` }}
          >
            {/* <FocusTrap active={active}> */}
            <TextInput
              placeholder={t('UserManagement.entryAmount')}
              value={coinAmount}
              data-autofocus
              onChange={event => onChangeCoinAmount(event)}
              // onBlur={handleBlueInputUsdt}
              onInput={e => handleCheckInput(e)}
              classNames={{ root: classes.groupInputNumber, input: classes.textInput }}
              ref={coinAmountRef}
            />
            {/* </FocusTrap> */}

            <NativeSelect
              data={dataListCoin}
              rightSection={<IconArrowDown />}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              className={classes.buttonExchange}
              classNames={{ input: classes.inputWrap }}
              onChange={event => handleChooseCoin(event)}
            />
          </Group>
          {/* limit error*/}
          {errorAmount && (
            <Text className="small_3-regular" c={variable.secondary.secondary2}>
              {t('UserManagement.errorEntryAmountCoin')}
            </Text>
          )}

          {/* choose coin amount */}
          <Group position="apart" spacing={13} noWrap mt={16} mb={24}>
            {!!dataChooseCoin.length &&
              dataChooseCoin.map(valueAmount => (
                <Button
                  key={valueAmount.id}
                  bg={coinAmount === valueAmount.amount ? 'var(--primary-5)' : '#F3F3F3'}
                  c={coinAmount === valueAmount.amount ? 'var(--black)' : 'var(--grey-dark)'}
                  onClick={() => handleChooseCoinAmount(valueAmount.amount)}
                  className={classes.buttonChooseUSDT}
                >
                  {valueAmount.amount}
                </Button>
              ))}
          </Group>

          <Text mt={10} mb={4} className="body_4-bold">
            {t('UserManagement.why')}{' '}
            <Text span c={'var(--secondary-2)'}>
              *
            </Text>
          </Text>
          <TextInput
            placeholder={t('UserManagement.entryContent')}
            value={reason}
            onChange={event => handleChangeReason(event)}
            classNames={{ root: classes.groupInputNumber, input: classes.textInputPayId }}
            ref={reasonRef}
          />
          {/* limit error*/}
          {errorReason && (
            <Text className="small_3-regular" c={variable.secondary.secondary2}>
              {t('UserManagement.errorEntryReason')}
            </Text>
          )}
        </Box>

        <Group className={classes.groupButtonContinue}>
          <FilledButton onClick={handleVolatilityBalanceOfUser} w="100%" h={44}>
            {t('UserManagement.buttonSendRequest')}
          </FilledButton>
        </Group>
      </Frame>

      {/* popup check confirm */}
      <Modal opened={opened} onClose={close} centered withCloseButton={false} padding={0} radius={20}>
        <PopupPaymentConfirmation
          amount={coinAmount}
          avatar={userInformation ? userInformation?.profile.avatar : ''}
          coinId={coinId}
          phoneNumber={userInformation ? userInformation?.profile.phone_number : ''}
          userName={userInformation ? userInformation?.profile.name : ''}
          onConfirmTrading={submitConfirm}
          loadingButtonConfirm={loadingCreateRequest}
        />
      </Modal>

      {/* popup create request success */}
      <Modal
        opened={openPopupSuccess}
        onClose={handleCancelPopupSuccessCreateRequest}
        centered
        withCloseButton={false}
        padding={0}
        radius={20}
      >
        <ConfirmAskPopup
          content={
            <Stack spacing={24} align={'center'}>
              <IconSuccess />
              <Text ta={'center'} className="body-3_regular">
                {t('UserManagement.CreatedRequestSuccess')}
              </Text>
            </Stack>
          }
          onClose={handleCancelPopupSuccessCreateRequest}
          onCancel={moveToSeeHistory}
          onSuccess={handleCancelPopupSuccessCreateRequest}
          cancelText={t('UserManagement.seeHistory')}
          successText={t('UserManagement.newRequest')}
        />
      </Modal>

      {/* popup create request fail */}
      <Modal
        centered
        opened={errorCreateRequest === RESPONSE_ENOUGH_REQUEST_WAITING}
        onClose={() => {
          dispatch(usersActions.resetErrorCreateRequest());
        }}
        closeButtonProps={{
          children: <XCircle />,
        }}
      >
        <FailPopup title={t('UserManagement.popupErrorEnoughRequestWaiting')} />
      </Modal>
      {/* popup create invalid min transfer */}
      <Modal
        centered
        opened={errorCreateRequest === RESPONSE_INVALID_MIN_TRANSFER}
        onClose={() => {
          dispatch(usersActions.resetErrorCreateRequest());
        }}
        closeButtonProps={{
          children: <XCircle />,
        }}
      >
        <FailPopup title={t('UserManagement.popupErrorInvalidMinTransfer')} />
      </Modal>

      {/* Modal số dư người dùng không đủ */}
      <ModalConfirm
        title={t('UserManagement.User balance is not enough to make the request !')}
        opened={errorBalanceEnough}
        onCloseModal={handleCloseModalBalance}
        btnLeft={
          <FilledButton
            sx={{
              flex: 1,
            }}
            onClick={handleCloseModalBalance}
          >
            {t('UserManagement.buttonUnderstand')}
          </FilledButton>
        }
      />
    </>
  );
};

const useStyle = createStyles(() => ({
  researchGroupInput: {
    borderRadius: '8px',
    border: `1px solid ${variable.neutral.grey}`,
    gap: 0,
  },

  textInput: {
    height: '44px',
    width: '100%',
    border: 'none',
    padding: '0 16px',
    borderRadius: '10px',
  },
  groupInputNumber: {
    width: '100%',
  },
  buttonExchange: {
    height: '44px',
    // width: '78px',
    background: variable.primary.primary5,
    borderRadius: '0 8px 8px 0',
  },
  inputWrap: {
    width: '90px',
    height: '44px',
    background: variable.primary.primary5,
    borderRadius: '0 8px 8px 0',
    paddingRight: '29px',
    '&:focus-within': {
      borderColor: 'var(--grey-dark)',
    },
  },
  //   choose
  buttonChooseUSDT: {
    flex: '1 1 76px',
    border: 'transparent',
    minWidth: '76px',
    paddingRight: '5px',
    paddingLeft: '5px',

    '&:hover': {
      background: variable.primary.primary5,
      filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    },
  },
  textInputPayId: {
    height: '44px',
    width: '100%',
    padding: '0 16px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 400,
    // border: `1px solid ${params.errorBinanceId ? variable.secondary.secondary2 : '#929292'}`,
    border: `1px solid #929292`,
    '&:focus': {
      border: `1px solid #929292`,
    },
  },
  // button
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
