import React from 'react';
import { Drawer, createStyles } from '@mantine/core';
import ContentFilterRequest from './ContentFilterRequest';

interface MobileFilterRequestProps {
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

const MobileFilterRequest = ({
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
}: MobileFilterRequestProps) => {
  const { classes } = makeStyles();

  return (
    <Drawer
      classNames={{
        content: classes.drawer,
        header: classes.headerDrawer,
        body: classes.drawerBody,
      }}
      opened={opened}
      onClose={closeFilter}
      position="bottom"
      size={530}
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
    </Drawer>
  );
};

const makeStyles = createStyles(() => ({
  drawer: {
    borderRadius: '20px 20px 0px 0px',
    overflow: 'initial',
    overflowY: 'scroll',
  },

  headerDrawer: {
    display: 'none',
  },

  drawerBody: {
    padding: 0,
    height: '100%',
  },
}));

export default MobileFilterRequest;
