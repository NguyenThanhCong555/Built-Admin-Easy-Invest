import { Divider, FileButton, Flex, Image, Text, createStyles } from '@mantine/core';
import { images } from 'assets/images';
import { ReactComponent as CoinUsdt } from 'assets/icons/coin/usdt.svg';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { configDate } from 'utils/helpers/configDate';
import { fomatDate } from 'utils/helpers/fomatDate';
import { FilledButton } from 'app/components/Button/FilledButton';
import { useDispatch, useSelector } from 'react-redux';
import { requestActions } from 'store/slice/request';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { clearPhoneCode84 } from 'helpers/clearPhoneCode84';
import { formatCoinUS } from 'utils/helpers/formatCoinUs';
interface IpropsStyle {
  avatar?: string;
  userName?: string;
  phoneCode?: string;
  coinAva?: string;
  money?: string | number;
  transactionCode?: string | number;
  timeCreated?: any;
  id?: string | number;
  ifconfirm?: () => void;
  service?: number;
}
export const CartRequestSearch = (props: IpropsStyle) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { classes: c } = createStyleProps({});
  const navigate = useNavigate();
  const isrefuse = () => {
    const request_id = props?.id;
    dispatch(
      requestActions?.requestDepositRefuse({
        request_id,
        service: props.service,
      }),
    );
  };
  const url = ['/request-plus', '/request-deduction'];
  const url2 = window.location.href;

  const checkUrl = url.some(path => url2.includes(path));

  const [attribute, setAttribute] = useState('');
  useEffect(() => {
    switch (props?.service) {
      case 1:
        setAttribute(t('RequestSearch.Recharge'));
        break;
      case 2:
        setAttribute(t('RequestSearch.Withdraw'));
        break;
      case 3:
        setAttribute('Staking');
        break;
      case 4:
        setAttribute(t('RequestSearch.Transfer'));
        break;
      case 5:
        setAttribute(t('RequestSearch.Receive'));
        break;
      case 6:
        setAttribute('P2P');
        break;
      default:
        setAttribute('...');
        break;
    }
  }, [props?.service]);
  return (
    <Flex className={c.boxDepsit}>
      <Helmet>
        <title>{t('filter.Browse recharge requests')}</title>
        <meta name="description" content="A Boilerplate application homepage" />
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <Flex
        onClick={() => {
          navigate(`/balance-fluctuations/detail/${props.id}`);
        }}
        className={c.Deposittop}
      >
        <Flex className={c.deposiboxLeft}>
          {
            <Image
              src={`${props?.avatar}`}
              sx={{
                width: '50px !important',
                height: '100% !important',
                justifyContent: 'center',
                alignItems: 'flex-end',
                display: 'flex',
              }}
            ></Image>
          }
        </Flex>
        <Flex className={c.deposiboxRight}>
          <Text>{`${props?.userName}`}</Text>
          <Text>{clearPhoneCode84(props?.phoneCode)}</Text>
        </Flex>
      </Flex>
      <Flex
        onClick={() => {
          navigate(`/balance-fluctuations/detail/${props.id}`);
        }}
        className={c.Depositbottom}
      >
        <Flex className={c.infoDeposi}>
          <Text ml={10} className="text1 lh">
            {t('filter.Amount')}
          </Text>
          <Flex mr={10}>
            <Text fw={700} fz={16} className="text2 lh">
              {formatCoinUS(props?.money)}
            </Text>
            {props?.coinAva ? (
              <Flex
                sx={{
                  width: '24px',
                  height: '24px',
                  background: `url(${props?.coinAva})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  objectFit: 'cover',
                  backgroundSize: '100%',
                  overflow: 'hidden',
                }}
              ></Flex>
            ) : (
              <CoinUsdt />
            )}
          </Flex>
        </Flex>

        <Flex className="code">
          <Text fw={700} ml={10} className="lh">
            {t('filter.GD')}
          </Text>
          <Text fw={700} mr={10} className="lh">
            {`${props?.transactionCode}`}
          </Text>
        </Flex>

        <Flex className="code">
          <Text fw={700} ml={10} className="lh">
            {t('RequestSearch.transactiontype')}
          </Text>
          <Text fw={700} mr={10} className="lh">
            {attribute}
          </Text>
        </Flex>

        <Flex className="time">
          <Text fw={700} className="lh" ml={10}>
            {t('filter.Creation')}
          </Text>
          <Flex fw={700} className="lh" mr={10}>
            {fomatDate(props?.timeCreated)}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        sx={{
          width: '100%',
          height: '20px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></Flex>
    </Flex>
  );
};
const createStyleProps = createStyles((theme, params: IpropsStyle) => ({
  Depositbottom: {
    maxWidth: '100%',
    flexDirection: 'column',
    width: '100%',
    height: '60%',
    marginTop: '5px',
    marginBottom: '-10px',
    alignItems: 'center',
    '.lh': {
      lineHeight: '26px',
    },
    '.code': {
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    '.time': {
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    '.status': {
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',

      '.status_box': {
        width: '84px',
        height: '20px',
        borderRadius: '10px',
        ':hover': {
          boxShadow: '0px 2px 4px #00000033',
        },
        '&-text': {
          fontSize: 12,
          fontWeight: 500,
          textAlign: 'center',
          width: '100%',
        },
      },
    },
  },
  infoDeposi: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',

    '.text1': {
      fontWeight: 700,
      fontSize: 16,
      color: '#000000',
    },
    '.text2': {
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--primary-2)',
      marginRight: '6px',
    },
  },
  deposiboxLeft: {
    borderRadius: '50%',
    background: '#E9DEFF',
    overflow: 'hidden',
    display: 'flex',
    width: '50px',
    height: '50px',
    justifyContent: 'center',
    boxSizing: 'border-box',
    alignItems: 'center',
  },
  deposiboxRight: {
    flexDirection: 'column',
    marginLeft: '9px',
    justifyContent: 'center',
    alignItems: 'flex-start',

    '& :nth-of-type(1)': {
      fontSize: 16,
      lineHeight: '18px',
      fontWeight: 700,
      color: '#000000',
    },
    '& :nth-of-type(2)': {
      fontSize: 14,
      fontWeight: 400,
      color: 'var(--grey-black)',
    },
  },
  boxDepsit: {
    maxWidth: '570px',
    width: '100%',
    border: '1px solid var(--white-light)',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px #00000033',
    margin: '6px auto',
    marginTop: '0px !important',
    flexDirection: 'column',
  },
  Deposittop: {
    maxWidth: '100%',
    width: '100%',
    margin: '10px 10px 0px 10px',
  },
}));
