import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Center, Flex, Loader, Stack, Text, createStyles } from '@mantine/core';
import { NavContainer } from 'app/components/navigation/NavContainer';
import { ReactComponent as IconFilter } from 'assets/icons/filter.svg';
import { useLocation } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';

import MobileFilterRequest from '../components/MobileFilterRequest';
import WebFilterRequest from '../components/WebFilterRequest';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { requestActions } from 'store/slice/request';
import {
  selectCalledWithdraw,
  selectResponseActionRequest,
  selectResponseRequest,
  selectTotalPageRequest,
  selectWithdraw,
} from 'store/slice/request/selector';
import { CardRequestDeposit } from '../components/CartRequestDeposit';
import { images } from 'assets/images';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import ModalConfirmWithdraw from '../components/ModalConfirmWithdraw';
import { useNavigate } from 'react-router';
import ModalConfirm from 'app/components/Modal/ModalConfirm';
import { FilledButton } from 'app/components/Button/FilledButton';
import Loading from 'app/components/Loading/Loading';
import { useFilterWithdrawRequest } from '../components/FilterContext/FilterWithdrawProvider';

interface InPropsStyle {}
export const Withdraw = () => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [openRequestChecked, setOpenRequestChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { classes } = createStyleProps({});
  const mobile = useMediaQuery('(max-width: 768px)');
  const dispatch = useDispatch();
  const {
    opened: openedFilter,
    isFilter,
    closeFilter,
    openFilter,
    setFilter,
    activeStatus,
    active,
    setActive,
    setActiveStatus,
    filter,
    refresh,
    setRefresh,
    filterAgain,
    handleFilter,
    handleRefresh,
  } = useFilterWithdrawRequest();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [select, setSelect] = useState<{
    id: number;
    exchange: number;
  } | null>(null);

  const requests = useSelector(selectWithdraw);
  const totalPage = useSelector(selectTotalPageRequest);
  const responseRequest = useSelector(selectResponseRequest);
  const responseActionRequest = useSelector(selectResponseActionRequest);
  const calledWithdraw = useSelector(selectCalledWithdraw);

  useLayoutEffect(() => {
    return () => {
      dispatch(requestActions.resetDataWithdraw());
      dispatch(requestActions.resetResponse());
      dispatch(requestActions.resetTotalPage());
      dispatch(requestActions.resetCalledWithdraw());
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(
      requestActions.requestFilterListRequests({
        service: 2,
        page: 1,
        status: 0,
        role: 0,
      }),
    );
  }, []);

  useEffect(() => {
    if (isFilter) {
      dispatch(requestActions.resetDataWithdraw());
      dispatch(requestActions.resetResponse());
      dispatch(requestActions.resetTotalPage());
      dispatch(requestActions.resetCalledWithdraw());
      setPage(1);
      setLoading(true);
      setHasMore(true);

      const { request_id, requester_phone, start, end, status } = filter;

      dispatch(
        requestActions.requestFilterListRequests({
          request_id: request_id ?? null,
          requester_phone: requester_phone ?? null,
          begin_time: start.getTime(),
          end_time: end.getTime(),
          status: status,
          role: 0,
          service: 2,
          page: 1,
        }),
      );
    }

    if (refresh) {
      dispatch(requestActions.resetDataWithdraw());
      dispatch(requestActions.resetResponse());
      dispatch(requestActions.resetTotalPage());
      dispatch(requestActions.resetCalledWithdraw());
      setPage(1);
      setLoading(true);
      setHasMore(true);
      setRefresh(false);

      dispatch(
        requestActions.requestFilterListRequests({
          service: 2,
          page: 1,
          status: 0,
          role: 0,
        }),
      );
    }
  }, [isFilter, filterAgain, refresh]);

  function fetchMoreData() {
    if (totalPage === page) {
      setHasMore(false);
      return;
    }
    if (isFilter) {
      const { request_id, requester_phone, start, end, status } = filter;
      dispatch(
        requestActions.requestFilterListRequests({
          request_id: request_id ?? null,
          requester_phone: requester_phone ?? null,
          begin_time: start.getTime(),
          end_time: end.getTime(),
          status: status,
          service: 2,
          page: page + 1,
          role: 0,
        }),
      );
    } else
      dispatch(
        requestActions.requestFilterListRequests({
          service: 2,
          page: page + 1,
          status: 0,
          role: 0,
        }),
      );

    setPage(page + 1);
  }

  function handleConfirmWithdraw(item) {
    setSelect({
      id: item?.id,
      exchange: item?.exchange,
    });
    open();
  }

  function handleOpenRequestChecked() {
    setOpenRequestChecked(true);
  }

  useEffect(() => {
    // Action lên 1 request đã hủy hoặc xác nhận -> hiện popup
    if (responseActionRequest.error === 25) {
      close();
      handleOpenRequestChecked?.();
      dispatch(requestActions.resetResponseActionRequest());
    }
  }, [responseActionRequest.loading]);

  useLayoutEffect(() => {
    if (calledWithdraw) {
      setLoading(false);
    }
  }, [calledWithdraw]);

  return (
    <>
      <Helmet>
        <title>{t('approveWithdraw.Approve withdrawal request')}</title>
        <meta name="description" content="A Boilerplate application homepage" />
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <Loading visible={loading} />
      <NavContainer
        laberHeader={t('approveWithdraw.Withdrawal Request')}
        propsFilter={
          <Flex onClick={openFilter}>
            <IconFilter />
          </Flex>
        }
        backRole="/"
        isbackpage={false}
        isfilter={true}
      >
        <Stack className={classes.stack}>
          {responseRequest.error === 0 &&
            (requests.length === 0 ? (
              <Center>
                <Text>
                  {isFilter
                    ? t('approveWithdraw.No matching withdrawal requests results !')
                    : t('approveWithdraw.There are no withdrawal requests yet !')}
                </Text>
              </Center>
            ) : (
              <InfiniteScroll
                hasMore={hasMore}
                dataLength={requests.length}
                next={fetchMoreData}
                height={`calc(100vh -  ${mobile ? 166.5 : 186.5}px)`}
                scrollThreshold="700px"
                loader={
                  <Center className={classes.centerLoading}>
                    <Loader size="sm" color="var(--primary-2)" />
                  </Center>
                }
                endMessage={
                  <Center className={classes.centerOver}>
                    <Text>{t('approveWithdraw.The withdrawal requests  is over !')}</Text>
                  </Center>
                }
              >
                {requests.map((item, _) => (
                  <CardRequestDeposit
                    key={item.id}
                    id={item.id}
                    ifconfirm={() => handleConfirmWithdraw(item)}
                    status={JSON.stringify(item.status)}
                    timeCreated={item.create_time}
                    transactionCode={JSON.stringify(item.id)}
                    money={`-${item.exchange}`}
                    phoneCode={item.requester_info.phone_number}
                    userName={item.requester_info.name}
                    avatar={item.requester_info.avatar !== '' ? item.requester_info.avatar : images.People3}
                    service={2}
                  />
                ))}
              </InfiniteScroll>
            ))}
        </Stack>

        <ModalConfirmWithdraw opened={opened} close={close} data={select} handleOpenRequestChecked={handleOpenRequestChecked} />
        <ModalConfirm
          opened={openRequestChecked}
          title={t('filter.This requirement has been handled earlier!')}
          onCloseModal={() => {
            setOpenRequestChecked(false);
          }}
          btnLeft={
            <FilledButton sx={{ flex: 1 }} onClick={() => setOpenRequestChecked(false)}>
              {t('approveWithdraw.Close')}
            </FilledButton>
          }
        />
        {mobile ? (
          <MobileFilterRequest
            opened={openedFilter}
            closeFilter={closeFilter}
            filter={filter}
            setFilter={setFilter}
            active={active}
            activeStatus={activeStatus}
            setActive={setActive}
            setActiveStatus={setActiveStatus}
            handleFilter={handleFilter}
            handleRefresh={handleRefresh}
          />
        ) : (
          <WebFilterRequest
            opened={openedFilter}
            closeFilter={closeFilter}
            filter={filter}
            setFilter={setFilter}
            active={active}
            activeStatus={activeStatus}
            setActive={setActive}
            setActiveStatus={setActiveStatus}
            handleFilter={handleFilter}
            handleRefresh={handleRefresh}
          />
        )}
      </NavContainer>
    </>
  );
};
const createStyleProps = createStyles((theme, params: InPropsStyle) => ({
  stack: {
    width: '100%',
    height: 'calc(100vh -  186.5px)',

    '@media (max-width: 768px)': {
      // height: '100vh',
    },
  },

  centerLoading: {
    marginTop: 10,

    '@media (max-width : 768px)': {
      marginBottom: 10,
    },
  },

  centerOver: {
    marginTop: 20,

    '@media (max-width : 768px)': {
      marginBottom: 20,
    },
  },
}));
