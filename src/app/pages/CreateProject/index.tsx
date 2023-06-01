import React from 'react';
import FormProject from 'app/components/FormProject/FormProject';
import { NavContainer } from 'app/components/navigation/NavContainer';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { images } from 'assets/images';

export function CreateProject() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Easy Invest</title>
        <meta name="description" content="A Boilerplate application homepage" />
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <NavContainer
        children={<FormProject type="add" />}
        laberHeader={t('FormProject.Add Project')}
        isbackpage={true}
      />
    </>
  );
}
