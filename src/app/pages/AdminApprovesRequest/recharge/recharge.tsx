import { Center, Flex, Loader as Loadd, Stack, Text, createStyles } from '@mantine/core';
import { NavContainer } from 'app/components/navigation/NavContainer';
import { ReactComponent as IconFilter } from 'assets/icons/filter.svg';
import { useLocation } from 'react-router-dom';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { CardRequestDeposit } from '../components/CartRequestDeposit';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { images } from 'assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { requestActions } from 'store/slice/request';
import {
  selectCalledWithdraw,
  selectRecharge,
  selectResponseActionRequest,
  selectResponseRequest,
  selectTotalPageRequest,
} from 'store/slice/request/selector';
import Loading from 'app/components/Loading/Loading';
import { useFilterRequest } from '../components/FilterContext/FilterRechargeProvider';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next';
import ModalConfirmRequest from '../components/ModalConfirmRequest';
import MobileFilterRequest from '../components/MobileFilterRequest';
import WebFilterRequest from '../components/WebFilterRequest';
import { Helmet } from 'react-helmet-async';
import { useForm } from '@mantine/form';
import { FilledButton } from 'app/components/Button/FilledButton';
import { useNavigate } from 'react-router';
import { ModalConfirmRecgarge } from '../components/ModalConfirmRecgarge';
import ModalConfirm from 'app/components/Modal/ModalConfirm';

interface InPropsStyle {
  mobile?: boolean;
}
export const Recharge = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectRecharge);
  const loading = useSelector(selectResponseRequest);
  const mobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { classes: c } = createStyleProps({ mobile: mobile });
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
  } = useFilterRequest();

  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isIDProject, setIsIDProject] = useState<any>(0);
  const [openRequestChecked, setOpenRequestChecked] = useState<boolean>(false);

  const totalPage = useSelector(selectTotalPageRequest);
  const responseRequest = useSelector(selectResponseRequest);
  const responseActionRequest = useSelector(selectResponseActionRequest);
  const calledWithdraw = useSelector(selectCalledWithdraw);

  const [loadingFirst, setLoadingFirst] = useState<boolean>(false);

  const form = useForm({
    initialValues: { tradingCode: '', quantity: '' },
    validate: {
      tradingCode: value => {
        if (value.trim().length <= 0 || !value) {
          return t('Header.Please enter the transaction code!');
        } else {
          return null;
        }
      },
    },
  });

  useLayoutEffect(() => {
    return () => {
      dispatch(requestActions.resetDataRecharge());
      dispatch(requestActions.resetResponse());
      dispatch(requestActions.resetTotalPage());
      dispatch(requestActions.resetCalledWithdraw());
    };
  }, []);

  useEffect(() => {
    setLoadingFirst(true);
    dispatch(
      requestActions?.requestFilterListRequests({
        service: 1,
        page: 1,
        role: 0,
        status: 0,
      }),
    );
  }, []);

  useEffect(() => {
    if (isFilter) {
      dispatch(requestActions.resetDataRecharge());
      dispatch(requestActions.resetResponse());
      dispatch(requestActions.resetTotalPage());
      dispatch(requestActions.resetCalledWithdraw());
      setPage(1);
      setHasMore(true);
      setLoadingFirst(true);

      const { request_id, requester_phone, start, end, status } = filter;

      dispatch(
        requestActions.requestFilterListRequests({
          request_id: request_id ?? null,
          requester_phone: requester_phone ?? null,
          begin_time: start.getTime(),
          end_time: end.getTime(),
          status: status,
          service: 1,
          page: 1,
          role: 0,
        }),
      );
    }

    if (refresh) {
      dispatch(requestActions.resetDataRecharge());
      dispatch(requestActions.resetResponse());
      dispatch(requestActions.resetTotalPage());
      dispatch(requestActions.resetCalledWithdraw());
      setPage(1);
      setHasMore(true);
      setRefresh(false);
      setLoadingFirst(true);

      dispatch(
        requestActions?.requestFilterListRequests({
          service: 1,
          page: 1,
          role: 0,
          status: 0,
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
          service: 1,
          page: page + 1,
          role: 0,
        }),
      );
    } else
      dispatch(
        requestActions?.requestFilterListRequests({
          service: 1,
          page: page + 1,
          role: 0,
          status: 0,
        }),
      );

    setPage(page + 1);
  }

  const acceptRecharge = () => {
    open();
  };

  const getidProject = id => {
    setIsIDProject(id);
  };

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
      setLoadingFirst(false);
    }
  }, [calledWithdraw]);

  return (
    <NavContainer
      laberHeader={t('filter.Request deposit')}
      propsFilter={
        <Flex onClick={openFilter}>
          <IconFilter />
        </Flex>
      }
      backRole={'/'}
      isbackpage={false}
      isfilter={true}
    >
      <Loading visible={loadingFirst} />
      <Helmet>
        <title>{t('filter.Browse recharge requests')}</title>
        <meta name="description" content="A Boilerplate application homepage" />
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <Stack className={c.stack}>
        {responseRequest.error === 0 &&
          (data?.length == 0 ? (
            <Center>
              <Text>
                {isFilter
                  ? t('approveWithdraw.No results required to deposit appropriately !')
                  : t('approveWithdraw.There is no deposit request !')}
              </Text>
            </Center>
          ) : (
            <InfiniteScroll
              hasMore={hasMore}
              dataLength={data.length}
              next={fetchMoreData}
              height={`calc(100vh -  ${mobile ? 166.5 : 186.5}px)`}
              scrollThreshold="200px"
              loader={
                <Center className={c.centerLoading}>
                  <Loadd size="sm" color="var(--primary-2)" />
                </Center>
              }
              endMessage={
                <Center className={c.centerOver}>
                  <Text>{t('approveWithdraw.Out of request to recharge !')}</Text>
                </Center>
              }
            >
              {data?.map((value, index) => {
                return (
                  <Stack key={index} onClick={() => getidProject({ id: value.id, exchange: value?.exchange })}>
                    <CardRequestDeposit
                      id={value?.id}
                      ifconfirm={acceptRecharge}
                      status={`${value?.status}`}
                      timeCreated={value?.create_time}
                      transactionCode={`${value?.id}`}
                      money={`+${value?.exchange}`}
                      phoneCode={`${value?.requester_info.phone_number}`}
                      userName={`${value?.requester_info.name}`}
                      avatar={`${value?.requester_info.avatar}`}
                      service={1}
                      realExchange={`+${value?.real_exchange}`}
                    ></CardRequestDeposit>
                  </Stack>
                );
              })}
            </InfiniteScroll>
          ))}
        <ModalConfirmRequest
          data={data}
          opened={opened}
          close={close}
          children={<ModalConfirmRecgarge close={close} idProject={isIDProject} />}
        />

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
      </Stack>
    </NavContainer>
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
  boxRequestCoin: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  centerOver: {
    marginTop: 20,

    '@media (max-width : 768px)': {
      marginBottom: 20,
    },
  },
  centerLoading: {
    marginTop: 10,

    '@media (max-width : 768px)': {
      marginBottom: 10,
    },
  },
  boxApproves: {
    maxWidth: '630px',
    width: '100%',
    height: params.mobile ? 'auto' : '648px',
    overflow: 'auto',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',

    '.infinite-scroll-component__outerdiv': {
      width: '100% !important',
    },
  },
}));
