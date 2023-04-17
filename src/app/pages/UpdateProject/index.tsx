import React, { useEffect, useState } from 'react';
import FormProject from 'app/components/FormProject/FormProject';
import { NavContainer } from 'app/components/navigation/NavContainer';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/slice/auth/selectors';
import { apiGet } from 'utils/http/request';
import { selectProject, selectResponse } from 'store/slice/projects/selectors';
import Loading from 'app/components/Loading/Loading';
import { projectsActions } from 'store/slice/projects';

import { useNavigate } from 'react-router-dom';

export function UpdateProject() {
  const { t } = useTranslation();
  const { projectId } = useParams();

  const { id, token } = useSelector(selectAuth);
  const projectData = useSelector(selectProject);
  const responseProject = useSelector(selectResponse);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /*
    Check loading,
    Check {error: 10, message: 'project_not_exist'} and 'insufficient authority'
  */

  useEffect(() => {
    dispatch(projectsActions.requestProjectInfo({ userid: projectId }));
  }, [projectId]);

  return (
    <>
      <Loading visible={responseProject.loading} />
      <NavContainer
        isbackpage={false}
        backRole={`/project-details/${projectId}`}
        children={<FormProject type="update" data={projectData} />}
        laberHeader="Sửa dự án"
      />
    </>
  );
}
