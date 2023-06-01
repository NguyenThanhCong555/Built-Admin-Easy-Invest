import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Flex, Stack, Text, createStyles } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';

import { NavContainer } from 'app/components/navigation/NavContainer';
import { SubtleButton } from 'app/components/Button/SubtleButton';
import { ReactComponent as ArrowLeft } from 'assets/icons/loginPage/arrow-narrow-left.svg';
import { FilledButton } from 'app/components/Button/FilledButton';
import StackForm from './components/StackForm/StackForm';
import StackPackage from './components/StackPackage/StackPackage';
import { apiGet, apiGetV2 } from 'utils/http/request';
import { selectAuth } from 'store/slice/auth/selectors';
import Loading from 'app/components/Loading/Loading';
import { stakeActions } from 'store/slice/stacke';
import { selectStake } from 'store/slice/stacke/selectors';
import Repair from './components/Repair/Repair';
import { selectProject } from 'store/slice/projects/selectors';
import { projectsActions } from 'store/slice/projects';
import ModalCoinNotExist from '../ProjectDetails/components/ModalCoinNotExist';

export const StakingCoinPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { id, token } = useSelector(selectAuth);
  const { stakeChangeId, products } = useSelector(selectStake);
  const projectData = useSelector(selectProject);

  const { t } = useTranslation();
  const { cx, classes } = makeStyles();

  const [isEmpty, setIsEmpty] = useState(false);
  const [opened, setOpened] = useState<boolean>(false);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [stackList, setStackList] = useState<any[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number | string | undefined>(-1);
  const handleShowStackForm = () => {
    if (isShow) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  };

  const handleFetchStackList = () => {
    const response: any = apiGetV2(`/ez/stake/admin/getlist?project_id=${projectId}`, null);
    return response;
  };
  const { isFetching } = useQuery({
    queryKey: ['handleFetchStackList'],
    queryFn: handleFetchStackList,
    enabled: stakeChangeId === projectId || !products?.find(product => product.project_id === projectId),
    onSuccess(result) {
      const { data: dataResponse, error } = result.data;

      if (error === 0) {
        dispatch(
          stakeActions.getStakeOfEachProject({
            products: dataResponse,
            projectId: projectId,
          }),
        );
        if (stakeChangeId === projectId) {
          dispatch(stakeActions.resetStakeChangeId());
        }
        const data = dataResponse?.filter((item, _) => item?.type === 1);
        setStackList(data);
      }
    },
  });

  useEffect(() => {
    const newStakeList = products?.find(product => product.project_id === projectId);
    const data = newStakeList?.data?.filter((item, _) => item?.type === 1);
    setStackList(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    if (projectData?.id === Number(projectId)) return;
    dispatch(projectsActions.requestProjectInfo({ userid: projectId }));
  }, [projectId]);

  useEffect(() => {
    if (projectData?.id !== -1) {
      if (!projectData?.coinInfo?.coin_name) {
        setOpened(true);
        // navigate('/home');
      }
    }
  }, [projectData]);

  return (
    <NavContainer isbackpage={true} laberHeader={projectData?.name}>
      <Loading visible={isFetching} />
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <Flex className={classes.header}>
            <SubtleButton className={classes.backBtn} onClick={() => navigate(`/project-details/${projectId}`)}>
              <ArrowLeft />
            </SubtleButton>
            <Text className="body_2-medium">Stacking {projectData?.coinInfo?.coin_name ?? 'Coin'}</Text>
          </Flex>
          {!isEmpty && (
            <>
              <StackForm isShow={isShow} projectId={projectId} isRepair={false} setIsEmpty={setIsEmpty} type={1} />
              {!isShow && (
                <FilledButton className={classes.addBtn} onClick={handleShowStackForm}>
                  {t('FormProject.Add')}
                </FilledButton>
              )}
            </>
          )}
        </div>
        <Stack className={classes.stackings}>
          {stackList?.map(stake => (
            <StackPackage key={stake.id} data={stake} onRepair={setIsModal} setActiveId={setActiveId} />
          ))}
        </Stack>
      </div>
      <Repair isOpen={isModal} onOpen={setIsModal} activeId={activeId} type={1} />
      <ModalCoinNotExist opened={opened} onCloseModal={() => navigate(`/project-details/${projectId}`)} />
    </NavContainer>
  );
};

const makeStyles = createStyles(() => ({
  wrapper: {
    width: '100%',
    overflow: 'hidden',
  },
  content: {
    width: '100%',
    paddingBottom: 24,
  },
  header: {
    width: '100%',
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    height: '100% !important',
    zIndex: 10000000,
  },
  addBtn: {
    width: '100%',
    height: 44,
  },
  stackings: {
    padding: '24px 0px 0px',
    borderTop: '1px solid #976FEA',
  },
}));
