import { Center, Flex, Stack, Loader as Loadd, Text, createStyles } from '@mantine/core';
import { NavContainer } from 'app/components/navigation/NavContainer';
import { ReactComponent as IconFilter } from 'assets/icons/filter.svg';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useFilterRequest } from '../components/FilterContext/FilterRechargeProvider';
import MobileFilterRequest from '../components/MobileFilterRequest';
import WebFilterRequest from '../components/WebFilterRequest';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { CardRequestDeposit } from '../components/CartRequestDeposit';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCalledWithdraw,
  selectDataAddition,
  selectRequirements,
  selectResponseRequest,
  selectTotalPageRequest,
} from 'store/slice/request/selector';
import { requestActions } from 'store/slice/request';
import { useNavigate } from 'react-router-dom';
import { images } from 'assets/images';
import { Helmet } from 'react-helmet-async';
import InfiniteScroll from 'react-infinite-scroll-component';
import ModalConfirmRequest from '../components/ModalConfirmRequest';
import { ModalConfirmPlus } from '../components/ModalConfirmPlus';
import Loading from 'app/components/Loading/Loading';
import { useFilterDeductionRequest } from '../components/FilterContext/FilterDeductionProvider';
import { ModalConfirmDeduction } from '../components/ModalConfirmDeduction';
interface InPropsStyle {
  mobile?: boolean;
}
export const RDeduction = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectRequirements);
  const loading = useSelector(selectResponseRequest);
  const mobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

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
  } = useFilterDeductionRequest();

  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isIDProject, setIsIDProject] = useState<any>(0);

  const totalPage = useSelector(selectTotalPageRequest);
  const calledWithdraw = useSelector(selectCalledWithdraw);
  const responseRequest = useSelector(selectResponseRequest);

  const [loadingFirst, setLoadingFirst] = useState<boolean>(false);

  useLayoutEffect(() => {
    setLoadingFirst(true);

    dispatch(
      requestActions?.requestFilterListRequests({
        service: 2,
        page: 1,
        role: 1,
        status: 0,
      }),
    );
  }, []);

  useLayoutEffect(() => {
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
          role: 1,
          status: status,
          service: 2,
          page: 1,
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
          service: 2,
          page: 1,
          role: 1,
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
          service: 2,
          role: 1,
          page: page + 1,
        }),
      );
    } else {
      dispatch(
        requestActions.requestFilterListRequests({
          service: 2,
          page: page + 1,
          role: 1,
          status: 0,
        }),
      );
    }

    setPage(page + 1);
  }

  const acceptRecharge = () => {
    open();
  };

  useLayoutEffect(() => {
    return () => {
      dispatch(requestActions.resetDataRecharge());
      dispatch(requestActions.resetResponse());
      dispatch(requestActions.resetTotalPage());
      dispatch(requestActions.resetCalledWithdraw());
    };
  }, []);

  const getidProject = id => {
    setIsIDProject(id);
  };

  useLayoutEffect(() => {
    if (calledWithdraw) {
      setLoadingFirst(false);
    }
  }, [calledWithdraw]);

  return (
    <NavContainer
      laberHeader={t('Header.submenu-request-deduction')}
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
        <title>{t('approveWithdraw.Except for subtraction')}</title>
        <meta name="description" content="A Boilerplate application homepage" />
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <Stack className={c.stack}>
        {responseRequest.error === 0 &&
          (data?.length == 0 ? (
            <Center>
              <Text>
                {isFilter
                  ? t('approveWithdraw.No results required to deduct appropriate money !')
                  : t('approveWithdraw.There is no request to deduct money !')}
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
                  <Text>{t('approveWithdraw.Expirated request !')}</Text>
                </Center>
              }
            >
              {data?.map((value, index) => {
                return (
                  <Stack
                    key={index}
                    onClick={() =>
                      getidProject({
                        id: value?.id,
                        exchange: value?.exchange,
                        service: 2,
                        name: value?.receiver_info?.name,
                        roleName: value?.receiver_info?.name,
                        avt: value?.receiver_info?.avatar,
                        phone: value?.receiver_info?.phone_number,
                      })
                    }
                  >
                    <CardRequestDeposit
                      id={value?.id}
                      ifconfirm={acceptRecharge}
                      status={`${value?.status}`}
                      timeCreated={value?.create_time}
                      transactionCode={`${value?.id}`}
                      money={`-${value?.exchange}`}
                      phoneCode={`${value?.requester_info.phone_number}`}
                      phoneCodeReceiver={`${value?.receiver_info?.phone_number}`}
                      userName={`${value?.requester_info.name}`}
                      avatar={`${value?.requester_info.avatar}`}
                      service={2}
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
          children={<ModalConfirmDeduction close={close} idProject={isIDProject} />}
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
