import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Container, Flex, Select, createStyles } from '@mantine/core';

import { ReactComponent as CaretDown } from 'assets/icons/homePage/caret-down.svg';
import { FilledButton } from 'app/components/Button/FilledButton';
import { selectAuth } from 'store/slice/auth/selectors';
import Loading from 'app/components/Loading/Loading';
import Project from './components/Project/Project';
import { baseDomain } from 'utils/http/request';
import { media } from 'styles/media';
import { authActions } from 'store/slice/auth';
import { projectsActions } from 'store/slice/projects';
import {
  selectCalledFirstProjects,
  selectFilterListProject,
  selectListProject,
  selectResponse,
} from 'store/slice/projects/selectors';

export function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Local
  const { t } = useTranslation();
  const { cx, classes } = makeStyles();
  // State
  const [select, setSelect] = useState<string>('2');
  // Func

  const calledFirstProjects = useSelector(selectCalledFirstProjects);
  const projectsNew = useSelector(selectFilterListProject);
  const responseProject = useSelector(selectResponse);

  useEffect(() => {
    if (calledFirstProjects) return;
    dispatch(projectsActions.requestGetAllProjects());
  }, []);

  useEffect(() => {
    dispatch(projectsActions.filterProject({ select }));
  }, [select, projectsNew]);

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Container fluid className={classes.container}>
        <Loading visible={responseProject.loading} />
        <div className={classes.action}>
          <Flex className={classes.actionFlex}>
            <Select
              rightSection={<CaretDown />}
              rightSectionWidth={30}
              data={[
                { value: '2', label: t('Home.All') },
                { value: '1', label: t('Home.Blocked') },
                { value: '0', label: t('Home.Operating') },
              ]}
              classNames={{
                root: classes.rootSelect,
                dropdown: classes.dropdownSelect,
                item: cx(classes.itemSelect, 'body_6-regular'),
                input: cx(classes.inputSelect, 'body_4-bold'),
                wrapper: classes.wrapperSelect,
              }}
              value={select}
              onChange={(value: string) => setSelect(value)}
            />
            <FilledButton
              className={classes.addBtn}
              onClick={() => navigate('/add')}
            >
              {t('Home.Add project')}
            </FilledButton>
          </Flex>
        </div>
        <div className={classes.gird}>
          {projectsNew?.map(project => (
            <Project key={project.id} projectId={project.id} data={project} />
          ))}
        </div>
      </Container>
    </>
  );
}

const makeStyles = createStyles(() => ({
  container: {
    height: '100%',
    maxWidth: 1170,
    padding: 16,
    margin: '0px auto',
  },
  action: {
    height: 48,
    width: '100%',
    [`${media.small()}`]: {
      height: 40,
    },
  },
  actionFlex: {
    gap: 16,
    height: '100%',
    maxWidth: 370,
    marginLeft: 'auto',
    justifyContent: 'space-between',
  },
  rootSelect: {
    width: '50%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: 'var(--light)',
  },
  inputSelect: {
    height: 48,
    border: 'none',
    borderRadius: 8,
    textAlign: 'center',
    color: 'var(--primary-2)',
    backgroundColor: 'transparent',
    position: 'relative',
    zIndex: 2,
    [`${media.small()}`]: {
      height: 40,
    },
  },
  dropdownSelect: {
    borderRadius: 8,
  },
  itemSelect: {
    '&[data-selected]': {
      backgroundColor: 'var(--primary-1)',
      ':hover': {
        backgroundColor: 'var(--primary-1)',
      },
    },
  },
  wrapperSelect: {
    height: '100%',
  },
  addBtn: {
    width: '50%',
    height: '100%',
  },
  gird: {
    display: 'grid',
    gap: '18px 38px',
    marginTop: 24,
    paddingBottom: 18,
    gridTemplateColumns: 'repeat( auto-fill, minmax(343px, 1fr))',
    [media.small()]: {
      gridTemplateColumns: 'repeat( auto-fill, minmax(100%, 1fr))',
    },
  },
}));
