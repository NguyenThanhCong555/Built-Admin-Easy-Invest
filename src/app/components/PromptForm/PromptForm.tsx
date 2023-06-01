import * as React from 'react';
import { createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import ReactRouterPrompt from 'react-router-prompt';
import ModalConfirm from '../Modal/ModalConfirm';
import { OutlineButton } from '../Button/OutlineButton';
import { FilledButton } from '../Button/FilledButton';

interface PromptFormProps {
  form: boolean;
}

const PromptForm = ({ form }: PromptFormProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();

  return (
    <ReactRouterPrompt when={form}>
      {({ isActive, onConfirm, onCancel }) => (
        <ModalConfirm
          title={t(
            'FormProject.The information has not been saved. Are you sure you want to exit ?',
          )}
          opened={isActive}
          onCloseModal={() => onCancel(isActive)}
          btnLeft={
            <OutlineButton
              className={classes.button}
              onClick={() => onConfirm(isActive)}
            >
              {t('FormProject.Exit')}
            </OutlineButton>
          }
          btnRight={
            <FilledButton
              className={classes.button}
              onClick={() => onCancel(isActive)}
            >
              {t('FormProject.Cancel')}
            </FilledButton>
          }
        />
      )}
    </ReactRouterPrompt>
  );
};

const makeStyles = createStyles(theme => ({
  button: {
    flex: 1,
    fontSize: '16px !important',
  },
}));

export default PromptForm;
