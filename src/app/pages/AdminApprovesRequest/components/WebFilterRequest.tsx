import React from 'react';
import { Modal, createStyles } from '@mantine/core';
import ContentFilterRequest from './ContentFilterRequest';

interface WebFilterRequestProps {
  opened: boolean;
  closeFilter: () => void;
  filter?: any;
  setFilter?: any;
  active?: any;
  activeStatus?: any;
  setActive?: any;
  setActiveStatus?: any;
  handleFilter?: any;
  handleRefresh?: any;
}

const WebFilterRequest = ({
  opened,
  closeFilter,
  filter,
  setFilter,
  active,
  activeStatus,
  setActive,
  setActiveStatus,
  handleFilter,
  handleRefresh,
}: WebFilterRequestProps) => {
  const { classes } = makeStyles();

  return (
    <Modal
      classNames={{
        header: classes.headerModal,
        content: classes.modal,
        body: classes.body,
      }}
      opened={opened}
      onClose={closeFilter}
      centered
      size={630}
    >
      <ContentFilterRequest
        filter={filter}
        setFilter={setFilter}
        active={active}
        activeStatus={activeStatus}
        setActive={setActive}
        setActiveStatus={setActiveStatus}
        handleFilter={handleFilter}
        handleRefresh={handleRefresh}
      />
    </Modal>
  );
};

const makeStyles = createStyles(() => ({
  modal: {
    borderRadius: 20,
    overflow: 'initial',
  },

  body: {
    padding: '0 !important',
  },

  headerModal: {
    display: 'none',
  },
}));

export default WebFilterRequest;
