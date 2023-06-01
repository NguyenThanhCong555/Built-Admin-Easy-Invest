import { ActionIcon, Box, Group, Stack, Text, createStyles } from '@mantine/core';
import { Frame } from 'app/layouts/Frame';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
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
import {
  selectCalledDetailRequest,
  selectDataAddition,
  selectDetailRequest,
  selectResponseItemAddRequire,
  selectResponseRequest,
} from 'store/slice/request/selector';
import { TDetailRequest } from 'store/slice/request/types';
import { FilledButton } from 'app/components/Button/FilledButton';
import Loading from 'app/components/Loading/Loading';
import ModalConfirmRequest from '../../components/ModalConfirmRequest';
import { useDisclosure } from '@mantine/hooks';
import { ModalConfirmPlus } from '../../components/ModalConfirmPlus';

type Props = {};

export const DetailRequestPlus = (props: Props) => {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const { requestId } = useParams();
  const { classes } = useStyle();
  const dispatch = useDispatch();
  const data = useSelector(selectResponseItemAddRequire);
  const [opened, { open, close }] = useDisclosure(false);
  const datas = useSelector(selectDataAddition);

  const calledDetailRequest = useSelector(selectCalledDetailRequest);
  const detailRequest = useSelector(selectDetailRequest);
  const [isIDProject, setIsIDProject] = useState<any>(0);

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
    navigation('/request-plus');
  };

  const moveToCancel = () => {
    const request_id = data?.id;
    dispatch(
      requestActions?.requestDepositRefuse({
        request_id,
        service: data?.service,
        currenTime: data?.update_time,
      }),
    );
  };
  console.log(data, 'this is response data');
  const moveToAccept = () => {
    open();
    getidProject({
      id: data?.id,
      exchange: data?.exchange,
      name: data?.receiver_info?.name,
      roleName: data?.receiver_info?.name,
      avt: data?.receiver_info?.avatar,
      phone: data?.receiver_info?.phone_number,
    });
  };
  const getidProject = id => {
    setIsIDProject(id);
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
          <Stack
            onClick={() =>
              getidProject({
                id: data?.id,
                exchange: data?.exchange,
                name: data?.receiver_info?.name,
                roleName: data?.receiver_info?.name,
                avt: data?.receiver_info?.avatar,
                phone: data?.receiver_info?.phone_number,
              })
            }
          >
            <CardDetail
              accountNumber={`${data?.receiver_info?.phone_number}`}
              avatarBank={data?.receiver_info?.avatar}
              creationTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(data?.create_time))}
              nameBank={data?.banking_info?.banking_name}
              nameReceiver={data?.receiver_info?.name}
              transferContent={`${data?.exchange}`}
              updateTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(data?.update_time))}
              content={`${data?.content}`}
              usdt={numberWithCommas(data.exchange)}
              status={data?.status}
              requesterInfo={DataDetailRequest?.requester_info}
            />
          </Stack>
        </Box>
      )}

      <Box className={classes.whiteSpace}></Box>

      {/* button edit and support  */}
      {data?.status === STATUS_WAITING && (
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
        data={datas}
        opened={opened}
        close={close}
        children={<ModalConfirmPlus close={close} idProject={isIDProject} />}
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
