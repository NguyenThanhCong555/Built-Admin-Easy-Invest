import { createStyles } from '@mantine/core';
import { FilledButton } from 'app/components/Button/FilledButton';
import { OutlineButton } from 'app/components/Button/OutlineButton';
import ModalConfirm from 'app/components/Modal/ModalConfirm';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

interface ModalCoinNotExistProps {
  opened: boolean;
  onCloseModal: () => void;
}

const ModalCoinNotExist = ({ opened, onCloseModal }: ModalCoinNotExistProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();

  const navigate = useNavigate();

  const { projectId } = useParams();
  return (
    <ModalConfirm
      title="Bạn cần thêm thông tin đồng coin để cho phép người dùng có thể Stake!"
      opened={opened}
      onCloseModal={onCloseModal}
      btnLeft={
        <OutlineButton className={classes.buttonCancel} h={45} onClick={onCloseModal}>
          Hủy bỏ
        </OutlineButton>
      }
      btnRight={
        <FilledButton
          className={classes.buttonNavigate}
          h={45}
          onClick={() => {
            navigate(`/add-Infocoin/${projectId}`);
          }}
        >
          Thêm
        </FilledButton>
      }
    />
  );
};

const makeStyles = createStyles(() => ({
  buttonCancel: {
    flex: 1,
    borderColor: 'var(--secondary-2) !important',
    color: 'var(--secondary-2) !important',
    fontSize: '16px !important',
  },
  buttonNavigate: {
    flex: 1,
    fontSize: '16px !important',
  },
}));

export default ModalCoinNotExist;
