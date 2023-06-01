import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Box, Center, Loader, Stack, Tabs, Text, createStyles } from '@mantine/core';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Frame } from 'app/layouts/Frame';
import { InformationCard } from './components/InformationCard';
import { FilterHistoryWithdraw } from './components/Filter';
import { DAY_IN_ONE_MONTH, MILLISECONDS, SECONDS_PER_DAY } from 'constants/common';
import { listTime } from './components/Filter/data';
import {
  selectTotalPageOfHistoryPlus,
  selectHistoryPlus,
  selectTotalPageLocalOfHistoryPlus,
  selectHistorySubtract,
  selectTotalPageOfHistorySubtract,
  selectTotalPageLocalOfHistorySubtract,
  selectUserInfo,
} from 'store/slice/users/selector';
import ConvertDate from 'helpers/formatDate';
// import { withdrawActions } from 'store/slice/withdraw';

// import { WITHDRAW_MONEY_CODE } from 'constants/account';
import { ReactComponent as IconFilter } from 'assets/icons/filter.svg';
import { variable } from 'styles/variable';
import { getRequestHistory } from 'store/slice/users/request';
import { RECHARGE_MONEY_CODE, WITHDRAW_MONEY_CODE } from 'constants/recharge';
import { usersActions } from 'store/slice/users';
import PopupFalling from '../components/PopupFalling';
import { StyledTabs } from 'app/components/tab';
import { useSearchParams } from 'react-router-dom';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';

type Props = {};

export type filterTransferHistory = {
  fromDate: Date;
  toDate: Date;
  chooseTime: number;
  page: number;
  chooseState: number;
  setFromDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setToDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setChooseTime: React.Dispatch<React.SetStateAction<number>>;
  setChooseState: React.Dispatch<React.SetStateAction<number>>;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setHasMorePlus: React.Dispatch<React.SetStateAction<boolean>>;
  setHasMoreSubtract: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
  tap?: string;
};

export const TAP_REQUEST_PLUS = 'plus';
export const TAP_REQUEST_SUBTRACT = 'subtract';

export const HistoryRequest = (props: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const targetQuery = searchParams.get('target');
  const { classes } = useStyle();

  const transferHistoryPlus = useSelector(selectHistoryPlus);
  const transferHistorySubtract = useSelector(selectHistorySubtract);
  const totalPagePlus = useSelector(selectTotalPageOfHistoryPlus);
  const totalPageLocalPlus = useSelector(selectTotalPageLocalOfHistoryPlus);
  const totalPageSubtract = useSelector(selectTotalPageOfHistorySubtract);
  const totalPageLocalSubtract = useSelector(selectTotalPageLocalOfHistorySubtract);

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date | null>(
    () => new Date(Math.floor(new Date().getTime()) - SECONDS_PER_DAY * DAY_IN_ONE_MONTH * MILLISECONDS),
  );
  const [toDate, setToDate] = useState<Date | null>(() => new Date());
  const [chooseTime, setChooseTime] = useState<number>(() => listTime[0].number);
  const [chooseState, setChooseState] = useState<number>(() => listTime[0].number);

  const [hasMorePlus, setHasMorePlus] = useState<boolean>(true);
  const [hasMoreSubtract, setHasMoreSubtract] = useState<boolean>(true);

  const userInformation = useSelector(selectUserInfo);

  const [tap, setTap] = useState<string>(targetQuery ? TAP_REQUEST_PLUS : TAP_REQUEST_SUBTRACT);

  const stateFilterPage: filterTransferHistory = {
    // page: totalPageLocal,
    page: 1,
    chooseTime: chooseTime,
    fromDate: fromDate ?? new Date(),
    toDate: toDate ?? new Date(),
    chooseState: chooseState,
    setChooseTime: setChooseTime,
    setFromDate: setFromDate,
    setToDate: setToDate,
    setHasMorePlus: setHasMorePlus,
    setHasMoreSubtract: setHasMoreSubtract,
    setOpenFilter: setOpenFilter,
    setChooseState: setChooseState,
    userId: userInformation?.userid ?? -1,
    tap: tap,
  };

  useEffect(() => {
    if (!userInformation) return;

    const dataFilterPlus: getRequestHistory = {
      beginTime: 0,
      endTime: 0,
      page: 1,
      service: RECHARGE_MONEY_CODE,
      userId: userInformation?.userid,
    };
    const dataFilterSubtract: getRequestHistory = {
      beginTime: 0,
      endTime: 0,
      page: 1,
      service: WITHDRAW_MONEY_CODE,
      userId: userInformation?.userid,
    };
    setHasMorePlus(true);
    setHasMoreSubtract(true);

    dispatch(usersActions.requestGetRequestHistoryPlus(dataFilterPlus));
    dispatch(usersActions.requestGetRequestHistorySubtract(dataFilterSubtract));
  }, []);

  useEffect(() => {
    if (totalPagePlus < totalPageLocalPlus) {
      setHasMorePlus(false);
      return;
    } else setHasMorePlus(true);
  }, [transferHistoryPlus]);

  useEffect(() => {
    if (totalPageSubtract < totalPageLocalSubtract) {
      setHasMoreSubtract(false);
      return;
    } else setHasMoreSubtract(true);
  }, [transferHistorySubtract]);

  const fetchMoreDataPlus = () => {
    if (!fromDate || !toDate) return;

    if (totalPagePlus < totalPageLocalPlus) {
      setHasMorePlus(false);
      return;
    }

    const dataFilter: getRequestHistory = {
      beginTime: fromDate.setHours(0, 0, 0, 1),
      endTime: toDate.setHours(23, 59, 59, 999),
      page: totalPageLocalPlus,
      service: RECHARGE_MONEY_CODE,
      status: 0,
    };
    dispatch(usersActions.requestGetRequestHistoryPlus(dataFilter));
  };

  const fetchMoreDataSubtract = () => {
    if (!fromDate || !toDate) return;

    if (totalPageSubtract < totalPageLocalSubtract) {
      setHasMorePlus(false);
      return;
    }

    const dataFilter: getRequestHistory = {
      beginTime: fromDate.setHours(0, 0, 0, 1),
      endTime: toDate.setHours(23, 59, 59, 999),
      page: totalPageLocalPlus,
      service: WITHDRAW_MONEY_CODE,
      status: 0,
    };
    dispatch(usersActions.requestGetRequestHistorySubtract(dataFilter));
  };

  const backpage = () => {
    navigation('/user-management/info?target=wallet');
  };

  const handleMoveRequestPlug = value => {
    setTap(value);
  };
  const handleMoveRequestSubtract = value => {
    setTap(value);
  };

  const moveToRequestDetail = value => {
    navigation(`/user-management/history/detail/${value}`);
  };
  return (
    <>
      <Frame
        onMovePage={backpage}
        titlePage={t('UserManagement.history.titlePage')}
        rightSection={<IconFilter onClick={() => setOpenFilter(true)} />}
      >
        <Box px={16} mt={14}>
          <StyledTabs
            defaultValue={targetQuery ? targetQuery : TAP_REQUEST_PLUS}
            classNames={{ tab: classes.tab, panel: classes.panel }}
          >
            <Tabs.List position={'center'} grow>
              <Tabs.Tab onClick={() => handleMoveRequestPlug(TAP_REQUEST_PLUS)} value={TAP_REQUEST_PLUS}>
                {t('UserManagement.history.requestPlus')}
              </Tabs.Tab>
              <Tabs.Tab onClick={() => handleMoveRequestSubtract(TAP_REQUEST_SUBTRACT)} value={TAP_REQUEST_SUBTRACT}>
                {t('UserManagement.history.requestSubtract')}
              </Tabs.Tab>
            </Tabs.List>

            {/* request plus */}
            <Tabs.Panel value="plus" pt="xs">
              <InfiniteScroll
                dataLength={transferHistoryPlus.length}
                next={fetchMoreDataPlus}
                hasMore={hasMorePlus}
                height="calc(100vh - 136.5px)"
                loader={<Center>{<Loader size="sm" color={variable.primary.primary2} />}</Center>}
                endMessage={
                  <Center mb={10}>
                    <Text>{t('wallet.The transaction is over !')}</Text>
                  </Center>
                }
              >
                <Stack spacing={12}>
                  {!!transferHistoryPlus.length &&
                    transferHistoryPlus.map(history => (
                      <InformationCard
                        key={history.id}
                        usdt={`+${numberWithCommas(history.exchange)}`}
                        phoneNumber={history?.requester ? history?.requester : '0'}
                        stakingId={history.id}
                        creationTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(history.create_time))}
                        approvalTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(history.update_time))}
                        status={history.status}
                        onClick={() => moveToRequestDetail(history.id)}
                      />
                    ))}
                </Stack>
              </InfiniteScroll>
            </Tabs.Panel>

            {/* request subtract */}
            <Tabs.Panel value="subtract" pt="xs">
              <InfiniteScroll
                dataLength={transferHistorySubtract.length}
                next={fetchMoreDataSubtract}
                hasMore={hasMoreSubtract}
                height="calc(100vh - 136.5px)"
                loader={<Center>{<Loader size="sm" color={variable.primary.primary2} />}</Center>}
                endMessage={
                  <Center mb={10}>
                    <Text>{t('wallet.The transaction is over !')}</Text>
                  </Center>
                }
              >
                <Stack spacing={12}>
                  {!!transferHistorySubtract.length &&
                    transferHistorySubtract.map(history => (
                      <InformationCard
                        key={history.id}
                        usdt={`-${numberWithCommas(history.exchange)}`}
                        phoneNumber={history?.requester ? history?.requester : '0'}
                        stakingId={history.id}
                        creationTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(history.create_time))}
                        approvalTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(history.update_time))}
                        status={history.status}
                        onClick={() => moveToRequestDetail(history.id)}
                      />
                    ))}
                </Stack>
              </InfiniteScroll>
            </Tabs.Panel>
          </StyledTabs>
        </Box>
      </Frame>

      <PopupFalling open={openFilter} onClose={() => setOpenFilter(false)}>
        <FilterHistoryWithdraw {...stateFilterPage} />
      </PopupFalling>
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
}));
