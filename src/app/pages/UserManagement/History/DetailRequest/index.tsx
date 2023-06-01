import { Box, Group, Text, createStyles } from '@mantine/core';
import { Frame } from 'app/layouts/Frame';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import { CardDetail } from './CardDetail';
import { useDispatch, useSelector } from 'react-redux';
import ConvertDate from 'helpers/formatDate';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { OutlineButton } from 'app/components/Button/OutlineButton';
import { variable } from 'styles/variable';
import { STATUS_WAITING } from 'constants/recharge';
import CopyToolTip from 'app/components/CopyToolTip/CopyToolTip';
import { requestActions } from 'store/slice/request';
import {
  selectCalledDetailRequest,
  selectDetailRequest,
  selectErrorDeleteRequest,
  selectLoadingCancelCreatedRequest,
} from 'store/slice/users/selector';
import { usersActions } from 'store/slice/users';
import { TDetailRequest } from 'store/slice/request/types';
import { INITIAL_VALUE, RESPONSE_SUCCESS_ERROR } from 'constants/common';
import ModalSuccess from 'app/components/Modal/ModalSuccess';

type Props = {};

export const DetailRequestRecharge = (props: Props) => {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const { requestId } = useParams();
  const { classes } = useStyle();
  const dispatch = useDispatch();

  const calledDetailRequest = useSelector(selectCalledDetailRequest);
  const detailRequest = useSelector(selectDetailRequest);
  const loadingDeleteRequest = useSelector(selectLoadingCancelCreatedRequest);
  const loadingErrorDeleteRequest = useSelector(selectErrorDeleteRequest);

  const callbackGetDetailRequest = useCallback((data: TDetailRequest[], requestId: number): TDetailRequest | undefined => {
    const indexOfRequest = data.map(request => request.id).indexOf(requestId);

    if (indexOfRequest === -1) return undefined;

    return data[indexOfRequest];
  }, []);

  const DataDetailRequest = useMemo(() => callbackGetDetailRequest(detailRequest, Number(requestId)), [detailRequest]);

  useEffect(() => {
    if (loadingErrorDeleteRequest !== INITIAL_VALUE && loadingErrorDeleteRequest !== RESPONSE_SUCCESS_ERROR) {
      dispatch(usersActions.resetErrorDeleteRequest());
      dispatch(usersActions.resetLoadingCancelCreatedRequest());
      alert('NOT CANCEL!');
    }
  }, [loadingErrorDeleteRequest]);

  useEffect(() => {
    if (requestId && !calledDetailRequest.includes(Number(requestId))) {
      dispatch(
        usersActions.requestGetDetailRequest({
          requestId: Number(requestId),
        }),
      );
    }
  }, [requestId]);

  const moveToListHistory = () => {
    navigation('/user-management/history?target=plus');
  };
  console.log(DataDetailRequest?.update_time, 'data');

  const moveToCancel = () => {
    const requestId = DataDetailRequest?.id;
    dispatch(
      usersActions?.requestCancelRequest({
        requestId: Number(requestId),
      }),
    );
  };

  const closePopupSuccess = () => {
    dispatch(usersActions.resetErrorDeleteRequest());
    dispatch(usersActions.resetLoadingCancelCreatedRequest());
  };

  return (
    <>
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
              creationTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(DataDetailRequest?.create_time))}
              transferContent={DataDetailRequest?.content}
              updateTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(DataDetailRequest?.update_time))}
              usdt={numberWithCommas(DataDetailRequest.exchange)}
              status={DataDetailRequest?.status}
              requesterInfo={DataDetailRequest?.requester_info}
              service={DataDetailRequest.service}
            />
          </Box>
        )}

        <Box className={classes.whiteSpace}></Box>

        {/* button edit and support  */}
        {DataDetailRequest?.status === STATUS_WAITING && (
          <Group className={classes.groupButtonContinue} noWrap>
            <OutlineButton loading={loadingDeleteRequest} onClick={moveToCancel} w="100%" h={44}>
              {t('UserManagement.history.buttonCancel')}
            </OutlineButton>
          </Group>
        )}
      </Frame>

      <ModalSuccess
        opened={loadingErrorDeleteRequest === RESPONSE_SUCCESS_ERROR}
        setOpened={closePopupSuccess}
        title={t('UserManagement.history.deleteRequestSuccess')}
        onClose={() => navigation('/user-management/history?target=plus')}
      ></ModalSuccess>
    </>
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
