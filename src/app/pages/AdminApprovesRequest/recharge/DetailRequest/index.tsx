import { ActionIcon, Box, Group, Text, createStyles } from '@mantine/core';
import { Frame } from 'app/layouts/Frame';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import { CardDetail } from './CardDetail';
import { useDispatch, useSelector } from 'react-redux';
// import { selectTransferHistory } from 'store/slice/recharge/selector';
// import { TransferHistory } from 'store/slice/recharge/types';
import ConvertDate from 'helpers/formatDate';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { OutlineButton } from 'app/components/Button/OutlineButton';
import { variable } from 'styles/variable';
import { STATUS_WAITING } from 'constants/recharge';
// import { rechargeActions } from 'store/slice/recharge';
import CopyToolTip from 'app/components/CopyToolTip/CopyToolTip';
import { requestActions } from 'store/slice/request';
import { selectCalledDetailRequest, selectDetailRequest, selectRecharge } from 'store/slice/request/selector';
import { TDetailRequest } from 'store/slice/request/types';
import { FilledButton } from 'app/components/Button/FilledButton';
import ModalConfirmRequest from '../../components/ModalConfirmRequest';
import { useDisclosure } from '@mantine/hooks';
import { ModalConfirmRecgarge } from '../../components/ModalConfirmRecgarge';

type Props = {};

export const DetailRequestRecharge = (props: Props) => {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const { requestId } = useParams();
  const { classes } = useStyle();
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);

  const calledDetailRequest = useSelector(selectCalledDetailRequest);
  const detailRequest = useSelector(selectDetailRequest);

  const callbackGetDetailRequest = useCallback((data: TDetailRequest[], requestId: number): TDetailRequest | undefined => {
    const indexOfRequest = data.map(request => request.id).indexOf(requestId);

    if (indexOfRequest === -1) return undefined;

    return data[indexOfRequest];
  }, []);

  const DataDetailRequest = useMemo(() => callbackGetDetailRequest(detailRequest, Number(requestId)), [detailRequest]);

  useEffect(() => {
    if (requestId && !calledDetailRequest.includes(Number(requestId))) {
      dispatch(
        requestActions.requestGetDetailRequest({
          requestId: Number(requestId),
        }),
      );
    }
  }, [requestId]);

  const moveToListHistory = () => {
    navigation('/approves-recharge');
  };
  console.log(DataDetailRequest?.update_time, 'data');

  const moveToCancel = () => {
    const request_id = DataDetailRequest?.id;
    dispatch(
      requestActions?.requestDepositRefuse({
        request_id,
        service: DataDetailRequest?.service,
        currenTime: DataDetailRequest?.update_time,
      }),
    );
  };

  const moveToAccept = () => {
    open();
  };

  return (
    <Frame onMovePage={moveToListHistory} titlePage={t('HistoryRecharge.titleDetailPage')}>
      {DataDetailRequest && (
        <Box px={16}>
          <Group w={'100%'} noWrap position="apart" mt={16} mb={8}>
            <Text className="small_2-medium">{t('HistoryRecharge.GDCode')}</Text>
            <Group spacing={2} noWrap>
              <Text className="small_2-medium">{DataDetailRequest.id}</Text>
              <CopyToolTip text={String(DataDetailRequest.id)} />
            </Group>
          </Group>

          <CardDetail
            accountNumber={DataDetailRequest?.banking_info.account_number}
            avatarBank={DataDetailRequest?.banking_info.banking_logo}
            creationTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(DataDetailRequest?.create_time))}
            nameBank={DataDetailRequest?.banking_info.banking_name}
            nameReceiver={DataDetailRequest?.banking_info.account_name}
            transferContent={DataDetailRequest?.content}
            updateTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(DataDetailRequest?.update_time))}
            usdt={numberWithCommas(DataDetailRequest.exchange)}
            status={DataDetailRequest?.status}
            requesterInfo={DataDetailRequest?.requester_info}
            realExchange={DataDetailRequest?.real_exchange}
          />
        </Box>
      )}

      <Box className={classes.whiteSpace}></Box>

      {/* button edit and support  */}
      {DataDetailRequest?.status === STATUS_WAITING && (
        <Group className={classes.groupButtonContinue} noWrap>
          <OutlineButton onClick={moveToCancel} w="calc(100% - 4px)" h={44}>
            {t('HistoryRecharge.buttonCancel')}
          </OutlineButton>
          <FilledButton onClick={moveToAccept} w="calc(100% - 4px)" h={44}>
            {t('HistoryRecharge.buttonAccept')}
          </FilledButton>
        </Group>
      )}

      <ModalConfirmRequest
        data={null}
        opened={opened}
        close={close}
        children={
          <ModalConfirmRecgarge close={close} idProject={{ id: DataDetailRequest?.id, exchange: DataDetailRequest?.exchange }} />
        }
      />
    </Frame>
  );
};

const useStyle = createStyles(() => ({
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

  whiteSpace: {
    '@media (max-width : 576px)': {
      paddingBottom: '40px',
      paddingTop: '40px',
    },
  },

  notificationTitle: {
    fontWeight: 700,
    fontSize: '16px',
  },
}));
