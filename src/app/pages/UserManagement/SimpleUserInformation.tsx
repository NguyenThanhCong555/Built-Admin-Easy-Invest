import { Avatar, Box, Center, Group, Stack, Tabs, createStyles, Text, Flex, Image, Modal } from '@mantine/core';
import { Frame } from 'app/layouts/Frame';
import ConvertDate from 'helpers/formatDate';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { variable } from 'styles/variable';
import { StyledTabs } from 'app/components/tab';
import { ReactComponent as XCircle } from 'assets/icons/modal/x-circle.svg';

import coinUSDT from 'assets/icons/coin/usdt.svg';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { CoinCard } from './components/CoinCard';
import { OutlineButton } from 'app/components/Button/OutlineButton';
import { FilledButton } from 'app/components/Button/FilledButton';
import {
  selectCoinUsdtOfUser,
  selectErrorBlockAccountOfUsers,
  selectListCoinUsdtOfUser,
  selectLoadingBlockAccountOfUsers,
  selectUserInfo,
} from 'store/slice/users/selector';
import { BLOCK, UNBLOCK } from 'constants/common';
import { usersActions } from 'store/slice/users';
import { RESPONSE_ERROR_INVALID_USER } from 'store/slice/users/response';

type Props = {};

export const SimpleUserInformation = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { classes } = useStyle();
  const [searchParams, setSearchParams] = useSearchParams();
  const targetQuery = searchParams.get('target');

  const TAP_USER_INFOR = 'user';
  const TAP_WALLET_INFOR = 'wallet';
  const [tap, setTap] = useState<string>(targetQuery ? TAP_WALLET_INFOR : TAP_USER_INFOR);
  const [calledFirst, setCalledFirst] = useState<boolean>(false);

  const userInformation = useSelector(selectUserInfo);
  const responseErrorBlockAccountOfUsers = useSelector(selectErrorBlockAccountOfUsers);
  const loadingBlockAccountOfUsers = useSelector(selectLoadingBlockAccountOfUsers);
  const coinUsdtOfUser = useSelector(selectCoinUsdtOfUser);
  const listCoinUsdtOfUser = useSelector(selectListCoinUsdtOfUser);

  const moveToEntrySearchUser = () => {
    navigation('/user-management');
  };

  const handleSearchHistory = () => {
    navigation('/user-management/history');
  };

  const MoveToVolatilityBalance = () => {
    navigation('/user-management/volatility');
  };

  const handleMoveUserInformation = (value: string) => {
    setTap(value);
  };
  const handleMoveWalletInformation = (value: string) => {
    if (!calledFirst && userInformation) {
      const userId = userInformation.userid;

      dispatch(usersActions.requestGetWalletInfoOfUser({ userId }));
      setCalledFirst(true);
    }
    setTap(value);
  };

  const handleBlockAccount = (status: number) => {
    if (!userInformation) return;
    const payload: { userId: number; status: number } = {
      userId: userInformation?.userid,
      status: status,
    };

    dispatch(usersActions.requestBlockAccount(payload));
  };

  return (
    <>
      <Frame onMovePage={moveToEntrySearchUser} titlePage={t('UserManagement.titlePageSearch')}>
        <Box px={16} mt={14}>
          <StyledTabs
            defaultValue={targetQuery ? targetQuery : TAP_USER_INFOR}
            classNames={{ tab: classes.tab, panel: classes.panel }}
          >
            <Tabs.List position={'center'} grow>
              <Tabs.Tab onClick={() => handleMoveUserInformation(TAP_USER_INFOR)} value="user">
                {t('UserManagement.userInfor')}
              </Tabs.Tab>
              <Tabs.Tab onClick={() => handleMoveWalletInformation(TAP_WALLET_INFOR)} value="wallet">
                {t('UserManagement.walletInfor')}
              </Tabs.Tab>
            </Tabs.List>

            {/* user infor */}
            <Tabs.Panel value="user" pt="xs">
              <Center mb={18}>
                <Avatar src={userInformation?.profile.avatar} w={168} h={158} radius={100}></Avatar>
              </Center>

              <Stack className={classes.UserInfo}>
                <Group position="apart">
                  <Text className="small_3-regular">{t('UserManagement.phoneNumber')}</Text>
                  <Text className="body_4-bold">+{userInformation?.profile.phone_number}</Text>
                </Group>
                <Group position="apart">
                  <Text className="small_3-regular">{t('UserManagement.Nickname')}</Text>
                  <Text className="body_4-bold">{userInformation?.profile.name}</Text>
                </Group>
                <Group position="apart">
                  <Text className="small_3-regular">{t('UserManagement.dateCreated')}</Text>
                  <Text className="body_4-bold">
                    {ConvertDate.getDDMMYY(new Date(Number(userInformation?.profile?.create_time)))}
                  </Text>
                </Group>
              </Stack>
            </Tabs.Panel>

            {/* wallet info */}
            <Tabs.Panel value="wallet" pt="xs">
              {/* total */}
              <Stack className={classes.stack}>
                <Flex className={classes.flex}>
                  <Flex w={'fit-content'} align={'center'} justify={'center'}>
                    <Image src={coinUSDT} mr={4} />
                    <Text className={classes.title}>&nbsp;USDT</Text>
                  </Flex>
                  <Text className={classes.title2}> {numberWithCommas(coinUsdtOfUser?.balance)}</Text>
                </Flex>
              </Stack>

              <Stack spacing={12} mt={14} className={classes.listCoinBox}>
                {!!listCoinUsdtOfUser.length &&
                  listCoinUsdtOfUser.map(coin => (
                    <CoinCard
                      key={coin.coin_id}
                      avatar={coin?.coin_avatar}
                      balance={numberWithCommas(coin?.balance.toFixed(3))}
                      coinName={coin?.coin_name}
                    />
                  ))}
              </Stack>
            </Tabs.Panel>
          </StyledTabs>
        </Box>

        {tap === TAP_USER_INFOR ? (
          <Group className={classes.groupButtonContinue} noWrap>
            {userInformation?.status === UNBLOCK ? (
              <OutlineButton loading={loadingBlockAccountOfUsers} onClick={() => handleBlockAccount(BLOCK)} w="100%" h={44}>
                {t('UserManagement.buttonBlockAccount')}
              </OutlineButton>
            ) : (
              <FilledButton loading={loadingBlockAccountOfUsers} onClick={() => handleBlockAccount(UNBLOCK)} w="100%" h={44}>
                {t('UserManagement.buttonUnblockAccount')}
              </FilledButton>
            )}
          </Group>
        ) : (
          <Group className={classes.groupButtonContinue} noWrap>
            <OutlineButton onClick={handleSearchHistory} w="calc(100% - 4px)" h={44}>
              {t('UserManagement.buttonSearchHistory')}
            </OutlineButton>
            <FilledButton onClick={MoveToVolatilityBalance} w="calc(100% - 4px)" h={44}>
              {t('UserManagement.buttonExchangeBalance')}
            </FilledButton>
          </Group>
        )}
      </Frame>

      <Modal
        opened={responseErrorBlockAccountOfUsers === RESPONSE_ERROR_INVALID_USER}
        onClose={() => dispatch(usersActions.resetResponseErrorBlockAccount())}
        centered
        closeButtonProps={{
          children: <XCircle />,
        }}
      >
        <Text align="center" className="small_3-regular">
          {t('UserManagement.errorPopupInvalidUser')}
        </Text>
        <FilledButton onClick={() => dispatch(usersActions.resetResponseErrorBlockAccount())} w={'100%'} mt={16}>
          {t('UserManagement.buttonUnderstand')}
        </FilledButton>
      </Modal>
    </>
  );
};

const useStyle = createStyles(theme => ({
  tab: {
    width: '50%',
    height: '40px',
    fontWeight: 700,
    fontFamily: 'Sarabun',
    color: variable.primary.primary2,
    justifyContent: 'center',
  },
  panel: {
    marginTop: '24px',
  },

  boxContent: {
    'ul, ol': {
      paddingLeft: 38,
    },
    p: {
      marginBottom: 7,
    },

    hr: {
      marginTop: 16,
      marginBottom: 12,
      borderTop: '1px dashed #868e96',
    },

    'h1,h2,h3,h4': {
      marginBottom: 12,
    },

    blockquote: {
      fontSize: '18px',
      margin: '16px 0',
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
      padding: '16px 20px',
      color: '#000000',
      borderLeft: '6px solid #dee2e6',
    },

    code: {
      padding: '1px 5px',
      borderRadius: '4px',
      color: '#000000',
      backgroundColor: '#f8f9fa',
      fontSize: '12px',
      border: '1px solid #dee2e6',
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

  UserInfo: {
    background: 'var(--white-light)',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    padding: '13px 12px',
    gap: 6,
  },

  // walet info
  stack: {
    backgroundColor: variable.primary.primary2,
    minHeight: 98,
    borderRadius: 14,
  },

  flex: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: 700,
    color: '#fff',
    maxWidth: '90%',
    textAlign: 'center',
  },
  title2: {
    fontSize: 32,
    fontWeight: 500,
    lineHeight: 1.2,
    color: '#fff',
    maxWidth: '90%',
    textAlign: 'center',
    marginBottom: '12px',
  },
  listCoinBox: {
    '@media (max-width : 576px)': {
      paddingBottom: '80px',
    },
  },
}));
