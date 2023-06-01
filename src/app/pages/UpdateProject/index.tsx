import React, { useEffect, useState } from 'react';
import FormProject from 'app/components/FormProject/FormProject';
import { NavContainer } from 'app/components/navigation/NavContainer';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/slice/auth/selectors';
import { selectProject, selectResponse } from 'store/slice/projects/selectors';
import Loading from 'app/components/Loading/Loading';
import { projectsActions } from 'store/slice/projects';

import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { images } from 'assets/images';

export function UpdateProject() {
  const { t } = useTranslation();
  const { projectId } = useParams();

  const projectData = useSelector(selectProject);
  const responseProject = useSelector(selectResponse);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectData?.id === Number(projectId)) return;
    dispatch(projectsActions.requestProjectInfo({ userid: projectId }));
  }, [projectId]);

  return (
    <>
      <Helmet>
        <title>Easy Invest</title>
        <meta name="description" content="A Boilerplate application homepage" />
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <Loading visible={responseProject.loading} />
      <NavContainer
        isbackpage={true}
        children={<FormProject type="update" data={projectData} />}
        laberHeader={t('FormProject.Edit project')}
      />
    </>
  );
}
