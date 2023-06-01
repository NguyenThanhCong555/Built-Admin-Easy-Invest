import { ActionIcon, Center, CopyButton, Flex, Text, Tooltip, createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { NavContainer } from 'app/components/navigation/NavContainer';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BoxDetail } from './components/BoxDetail';
import imgtest from 'assets/images/profilePage/people-3.svg';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { searchAction } from 'store/slice/search';
import { useParams } from 'react-router-dom';
import { selectDataInfoSearch } from 'store/slice/search/selector';

export interface interSearch {
  mobile: boolean;
}
const TransactionDetails = () => {
  const { t } = useTranslation();
  const mobile = useMediaQuery('(max-width:768px)');
  const { classes: c } = createStyeleBox({ mobile: mobile });
  const dispatch = useDispatch();
  const param = useParams();
  const data = useSelector(selectDataInfoSearch);

  useLayoutEffect(() => {
    const payload = {
      transaction_id: param?.requestId,
    };
    dispatch(searchAction.requestGetInfoFilter(payload));
  }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <NavContainer backRole="/balance-fluctuations" laberHeader={t('RequestSearch.Transactiondetails')}>
        <Center className={c.boxSearchDetail}>
          <Flex className={c.boxCoppyCode}>
            <Text>{t('RequestSearch.Tradingcode')}</Text>
            <Flex mr={-6}>
              <Text>{data?.id}</Text>
              <CopyButton value={`${data?.id}`} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                    <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                      {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Flex>
          </Flex>
          <BoxDetail
            WalletNumber={data?.detail?.trans_content}
            service={data?.service}
            quantity={data?.detail?.selling_fee ?? data?.detail?.purchase_fee}
            Coin={data?.exchange}
            coinName={data?.coin_name}
            CoinUsdtAfter={data?.balance}
            Name={data?.user_info.name}
            PhoneNumber={data?.user_info.phone_number}
            receiverNickName={data?.detail.receiver_nick_name}
            senderNickName={data?.detail.sender_nick_name}
            receiverPhone={data?.detail.receiver_phone}
            banking={data?.detail.banking}
            accountNumber={data?.detail.account_number}
            shortName={data?.detail.short_name}
            senderPhone={data?.detail.sender_phone}
            date={data?.user_info.create_time}
            Avt={data?.user_info.avatar ?? imgtest}
            projectName={data?.detail?.project?.name}
            interest_rate={data?.detail?.stake?.interest_rate}
            timeframe={data?.detail?.stake?.timeframe}
          ></BoxDetail>
        </Center>
      </NavContainer>
    </motion.div>
  );
};

const createStyeleBox = createStyles((theme, params: interSearch) => ({
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

export default TransactionDetails;
