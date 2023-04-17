import React from 'react';
import FormProject from 'app/components/FormProject/FormProject';
import { NavContainer } from 'app/components/navigation/NavContainer';
import { useTranslation } from 'react-i18next';

export function CreateProject() {
  const { t } = useTranslation();

  return (
    <NavContainer
      backRole="/home"
      children={<FormProject type="add" />}
      laberHeader={t('FormProject.Add Project')}
      isbackpage={false}
    />
  );
}
