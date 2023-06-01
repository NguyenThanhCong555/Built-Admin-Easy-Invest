import { Divider, FileButton, Flex, Image, Text, createStyles } from '@mantine/core';
import { images } from 'assets/images';
import { ReactComponent as CoinUsdt } from 'assets/icons/coin/usdt.svg';
import React, { useLayoutEffect } from 'react';
import { configDate } from 'utils/helpers/configDate';
import { fomatDate } from 'utils/helpers/fomatDate';
import { FilledButton } from 'app/components/Button/FilledButton';
import { useDispatch, useSelector } from 'react-redux';
import { requestActions } from 'store/slice/request';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { clearPhoneCode84 } from 'helpers/clearPhoneCode84';
interface IpropsStyle {
  avatar?: string;
  userName?: string;
  phoneCode?: string;
  phoneCodeReceiver?: string;
  money?: string | number;
  transactionCode?: string;
  timeCreated?: any;
  status?: string;
  id?: string | number;
  ifconfirm?: () => void;
  service?: number;
  IdGame?: string;
  coinName?: string;
  projectName?: string;
}
export const CartRequestWithdrawGame = (props: IpropsStyle) => {
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

  return (
    <Flex className={c.boxDepsit}>
      <Helmet>
        <title>{t('filter.Browse recharge requests')}</title>
        <meta name="description" content="A Boilerplate application homepage" />
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <Flex
        onClick={() => {
          dispatch(requestActions.requestItemAddAndRequire(props.id));
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
          dispatch(requestActions.requestItemAddAndRequire(props.id));
        }}
        className={c.Depositbottom}
      >
        <Flex className={c.infoDeposi}>
          <Text ml={10} className="text1 lh">
            {t('filter.Amount')}
          </Text>
          <Flex mr={10}>
            <Text fw={700} fz={16} className="text2 lh">
              {`${props?.money} ${props?.coinName}`}
            </Text>
          </Flex>
        </Flex>

        <Flex className={c.infoDeposi}>
          <Text ml={10} className="text1 lh">
            ID Game
          </Text>
          <Flex mr={10}>
            <Text fw={700} fz={16} className="lh">
              {`${props?.IdGame}`}
            </Text>
          </Flex>
        </Flex>

        <Flex className={c.infoDeposi}>
          <Text ml={10} className="text1 lh">
            Game
          </Text>
          <Flex mr={10}>
            <Text fw={700} fz={16} className="lh">
              {`${props?.projectName}`}
            </Text>
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

        <Flex className="time">
          <Text fw={700} className="lh" ml={10}>
            {t('filter.Creation')}
          </Text>
          <Flex fw={700} className="lh" mr={10}>
            {fomatDate(props?.timeCreated)}
          </Flex>
        </Flex>
        <Flex className="status">
          <Text fw={700} className="lh" ml={10}>
            {t('filter.Status')}
          </Text>
          <Flex
            sx={{
              background: `${
                props?.status == '0'
                  ? '#E9DEFF'
                  : props?.status == '1'
                  ? '#D1FFE4'
                  : props?.status == '-1'
                  ? '#FFDBDB'
                  : '#E9DEFF'
              }`,
            }}
            fw={700}
            className="status_box"
            mr={10}
          >
            <Text
              sx={{
                color: `${
                  props?.status == '0'
                    ? '#5D3BA4'
                    : props?.status == '1'
                    ? '#06B54C'
                    : props?.status == '-1'
                    ? '#F20000'
                    : '#5D3BA4'
                }`,
              }}
              className="status_box-text "
            >{`${
              props?.status == '0'
                ? t('filter.wait')
                : props?.status == '1'
                ? t('filter.success')
                : props?.status == '-1'
                ? t('filter.decline')
                : t('filter.Waiting')
            }`}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        sx={{
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {props?.status == '0' ? (
          <Flex
            sx={{
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Divider
              my="sm"
              sx={{
                height: '1px',
                background: '#EAEAEA',
                width: '95%',
                margin: '0 auto',
              }}
            />
            <Flex
              sx={{
                width: '100%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
            >
              <FilledButton
                sx={{
                  background: 'white !important',
                  border: '1px solid #976FEA',
                  ':first-of-type': { color: '#976FEA' },
                }}
                color="red"
                w={155}
                h={36}
                mb={12}
                onClick={() => isrefuse()}
              >
                {t('filter.refuse')}
              </FilledButton>
              <FilledButton sx={{}} onClick={() => props?.ifconfirm?.()} ml={10} w={155} h={36} mb={12}>
                {t('filter.Confirm')}
              </FilledButton>
            </Flex>
          </Flex>
        ) : (
          <Flex h={15}></Flex>
        )}
      </Flex>
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
    flexDirection: 'column',
  },
  Deposittop: {
    maxWidth: '100%',
    width: '100%',
    margin: '10px 10px 0px 10px',
  },
}));
