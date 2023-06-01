import React from 'react';
import { Select, createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { ReactComponent as IconDown } from 'assets/icons/homePage/caret-down.svg';

interface SelectLanguageProps {
  value: string | null;
  onSelect: any;
  error: any;
}

const SelectLanguage = ({ error, value, onSelect }: SelectLanguageProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  return (
    <Select
      classNames={{
        input: classes.input,
        label: classes.label,
        rightSection: classes.rightSection,
      }}
      label={t('FormProject.Language')}
      error={error}
      withAsterisk
      value={value}
      onChange={e => {
        onSelect(e);
      }}
      rightSection={<IconDown />}
      data={[
        { value: 'vi', label: t('FormProject.Vietnamese') },
        { value: 'en', label: t('FormProject.English') },
      ]}
    />
  );
};

const makeStyles = createStyles(theme => ({
  input: {
    border: '1px solid #929292',
    height: 44,
    borderRadius: 8,

    ':focus, :focus-within': {
      borderColor: 'var(--primary-2)',
    },
  },

  label: {
    fontSize: 14,
    fontWeight: 600,
  },

  rightSection: {
    pointerEvents: 'none',
  },
}));

export default SelectLanguage;
