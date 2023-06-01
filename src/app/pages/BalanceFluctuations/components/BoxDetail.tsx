import { Box, Center, Flex, Stack, Text, createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { ReactComponent as IconUsdt } from 'assets/icons/coin/usdt.svg';
import { useTranslation } from 'react-i18next';
import { BoxSearch } from './BoxSearch';
import { configDate, configDateV2 } from 'utils/helpers/configDate';
import baseimage from 'assets/images/frameImage/frameImage.svg';
import { clearPhoneCode84 } from 'helpers/clearPhoneCode84';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { formatCoinUS } from 'utils/helpers/formatCoinUs';
import { DAY_IN_ONE_MONTH, MILLISECONDS, SECONDS_PER_DAY } from 'constants/common';
export interface interSearch {
  mobile: boolean;
}
export interface IinterSearch {
  Name: string;
  coinName: string;
  CoinUsdtAfter: number | string;
  Coin: number | string;
  PhoneNumber: number | string;
  WalletNumber: number | string;
  date: number | string;
  service: number | string;
  Avt: string;
  quantity: string | number;
  projectName: string;
  shortName: string;
  accountNumber: string;
  receiverNickName: string;
  senderNickName: string | number;
  receiverPhone: string;
  senderPhone: string | number;
  interest_rate: number | string;
  timeframe: number | string;
  banking: string;
}
export const BoxDetail = (props: IinterSearch) => {
  const { t } = useTranslation();
  const mobile = useMediaQuery('(max-width:768px)');
  const { classes: c } = createStyeleBox({ mobile: mobile });
  const [attribute, setAttribute] = useState('');
  useEffect(() => {
    switch (props?.service) {
      case 1:
        setAttribute(t('RequestSearch.From'));
        break;
      case 2:
        setAttribute(t('RequestSearch.withd'));
        break;
      case 3:
        setAttribute(t('RequestSearch.To'));
        break;
      case 4:
        setAttribute(t('RequestSearch.From'));
        break;
      case 5:
        setAttribute(t('RequestSearch.Project'));
        break;
      case 6:
        setAttribute(t('RequestSearch.Quantity'));
        break;
      default:
        setAttribute('...');
        break;
    }
  }, [props?.service]);
  return (
    <BoxSearch coin={props?.Coin} service={props?.service} role={1}>
      <Flex className={c.boxTopSeach}>
        <Text color={Number(props.Coin) >= 0 ? '#26C95D' : 'rgba(0, 0, 0, 1)'} className={c.CoinRate}>
          {formatCoinUS(props.Coin)}
        </Text>
        <IconUsdt />
      </Flex>

      <Flex className={c.boxBottomSeach}>
        <Flex className={c.BoxAva}>
          <Flex className={c.ava}>
            <Flex
              className={c.mainAva}
              sx={{
                backgroundImage: `url(${props.Avt ?? baseimage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></Flex>
          </Flex>
          <Box mt={3}>
            <Flex fw={700} fz={16} color="#000000">
              {props.Name}
            </Flex>
            <Flex fw={400} fz={14} color="#424242">
              {clearPhoneCode84(props.PhoneNumber)}
            </Flex>
          </Box>
        </Flex>
        <Flex className={c.BoxInfo}>
          <Flex className={c.from}>
            <Text className={c.clo}>
              {props?.service == 6 ? (
                t('RequestSearch.Quantity')
              ) : props?.service == 5 ? (
                <Flex mb={-7} direction={'column'}>
                  <Text className={c.clo}>{t('RequestSearch.Project')}</Text>
                  <Text className={c.clo}>{t('RequestSearch.Stakingpackage')}</Text>
                </Flex>
              ) : props?.service == 4 ? (
                <Flex mt={3} mb={-5} direction={'column'}>
                  <Text className={c.clo}>{t('RequestSearch.To')}</Text>
                </Flex>
              ) : props?.service == 3 ? (
                <Flex mt={3} mb={-5} direction={'column'}>
                  <Text className={c.clo}>{t('RequestSearch.From')}</Text>
                </Flex>
              ) : props?.service == 2 ? (
                <Flex mt={3} mb={-5} direction={'column'}>
                  <Text className={c.clo}>{t('RequestSearch.withd')}</Text>
                </Flex>
              ) : props?.service == 1 ? (
                <Flex mt={3} mb={-5} direction={'column'}>
                  <Text className={c.clo}>{t('RequestSearch.From')}</Text>
                </Flex>
              ) : (
                <Center>s</Center>
              )}
            </Text>
            <Flex>
              {props?.service == 5 ? (
                <Flex mb={-7} direction={'column'}>
                  <Text ta={'right'} className={c.clo}>
                    {props.projectName}
                  </Text>
                  <Text className={c.clo}>{`${
                    Number(props?.timeframe) - SECONDS_PER_DAY * DAY_IN_ONE_MONTH * MILLISECONDS
                  } tháng - ${props?.interest_rate}%/năm`}</Text>
                </Flex>
              ) : props?.service == 6 ? (
                <Flex direction={'column'}>
                  <Text className={c.clo}>
                    {props?.quantity}&nbsp;
                    {props.coinName}
                  </Text>
                </Flex>
              ) : props?.service == 4 ? (
                <Flex mt={3} mb={-5} direction={'column'}>
                  <Text className={c.clo}>{`${props.receiverNickName} - ${props.receiverPhone}`}</Text>
                </Flex>
              ) : props?.service == 3 ? (
                <Flex mt={3} mb={-5} direction={'column'}>
                  <Text className={c.clo}>{`${props.senderNickName} - ${props.senderPhone}`}</Text>
                </Flex>
              ) : props?.service == 2 ? (
                <Flex mt={3} mb={-5} direction={'column'}>
                  <Text className={c.clo}>{`${props.banking} - ${props.accountNumber}`}</Text>
                </Flex>
              ) : props?.service == 1 ? (
                <Flex mt={3} mb={-5} direction={'column'}>
                  <Text className={c.clo}>{`${props.shortName} - ${props.accountNumber}`}</Text>
                </Flex>
              ) : (
                <Center>s</Center>
              )}
            </Flex>
          </Flex>
          <Flex className={c.BoxInfo}>
            <Flex className={c.from}>
              <Text className={c.clo}>{t('RequestSearch.Balance after transaction')}</Text>
              <Flex mt={1}>
                <Text mr={6} className={c.clo}>
                  {numberWithCommas(props.CoinUsdtAfter)}
                </Text>
                <IconUsdt />
              </Flex>
            </Flex>
          </Flex>
          <Flex className={c.date}>
            <Text fw={500} fz={14} color="#A9A9A9">
              {configDateV2(Number(props.date))}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </BoxSearch>
  );
};
const createStyeleBox = createStyles((theme, params: interSearch) => ({
  clo: {
    fontWeight: 500,
    fontSize: 14,
    color: '#000000',
  },
  date: {
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
    marginTop: '16px',
    marginBottom: '13px',
  },
  from: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginTop: '5px',
  },
  BoxInfo: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  mainAva: {
    width: '45px',
    height: '45px',
    background: '#E9DEFF',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  ava: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    background: '#E9DEFF',
    overflow: 'hidden',
    marginRight: '6px',
  },
  BoxAva: {
    width: '100%',
    marginTop: '12px',
  },
  CoinRate: {
    fontWeight: 700,
    fontSize: '24px',
    marginRight: '6px',
  },
  boxTopSeach: {
    maxWidth: '95%',
    width: '100%',
    height: '55px',
    borderBottom: '1px solid #EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxBottomSeach: {
    maxWidth: '95%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  boxCoppyCode: {
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '100%',
    width: '100%',
  },
  boxSearchDetail: {
    maxWidth: '95%',
    width: '100%',
    height: '630px',
    margin: '0 auto',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));
