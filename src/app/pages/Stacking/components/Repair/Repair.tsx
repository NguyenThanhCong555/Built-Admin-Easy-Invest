import { Modal, Text, createStyles } from '@mantine/core';
import React, { Dispatch, SetStateAction, memo, useEffect, useState } from 'react';
import StackForm from '../StackForm/StackForm';
import { useParams } from 'react-router-dom';
import { ProductState } from 'store/slice/stacke/type';
import { useSelector } from 'react-redux';
import { selectStake } from 'store/slice/stacke/selectors';
import { useTranslation } from 'react-i18next';

interface Props {
  isOpen: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
  activeId?: number | string;
  type: number;
}
const Repair = memo(({ isOpen, onOpen, activeId, type }: Props) => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const { products } = useSelector(selectStake);

  const { cx, classes } = makeStyles();

  const [data, setData] = useState<ProductState | undefined>();

  useEffect(() => {
    if (isOpen) {
      const currentProduct = products.find(product => product.project_id === projectId);
      const currentStake = currentProduct?.data.find(stake => stake.id === activeId);
      setData(currentStake);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return (
    <Modal
      opened={isOpen}
      onClose={() => onOpen(false)}
      classNames={{
        close: classes.closeModal,
        content: classes.contentModal,
      }}
    >
      <Text className={cx('subtitle_4-bold', classes.name)}>
        {t('FormProject.Accumulate')} {Number(data?.timeframe) / 86400000} {t('FormProject.Day')}- {data?.interest_rate}
        %/{t('FormProject.Year')}
      </Text>
      <StackForm isShow={true} projectId={projectId} data={data} isRepair={true} onOpen={onOpen} type={type} />
    </Modal>
  );
});
export default Repair;

const makeStyles = createStyles(() => ({
  name: {
    textAlign: 'center',
    color: 'var(--primary-2)',
  },
  closeModal: {
    display: 'none',
  },
  contentModal: {
    borderRadius: 14,
    paddingBottom: 16,
  },
}));
