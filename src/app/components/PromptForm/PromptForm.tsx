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
  const { classes } = makeStyles();

  return (
    <ReactRouterPrompt when={form}>
      {({ isActive, onConfirm, onCancel }) => (
        <ModalConfirm
          title="Các thông tin chưa được lưu. Bạn chắc chắn muốn thoát không?"
          opened={isActive}
          onCloseModal={() => onCancel(isActive)}
          btnLeft={
            <OutlineButton
              className={classes.button}
              onClick={() => onConfirm(isActive)}
            >
              Thoát
            </OutlineButton>
          }
          btnRight={
            <FilledButton
              className={classes.button}
              onClick={() => onCancel(isActive)}
            >
              Hủy bỏ
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
