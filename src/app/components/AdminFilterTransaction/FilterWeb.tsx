import { Modal, Flex, createStyles } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React, { memo, useEffect, useState } from 'react';
import { UseFilterRequestBalance } from './filterCard';
import { ReactComponent as XCircle } from 'assets/icons/modal/x-circle.svg';
import SearchForm from './components/SearchForm';

interface InPropsStyle {}
interface IPropsWebFilter {
  children?: any;
}
export const FilterWeb = memo((props: IPropsWebFilter) => {
  const mobile = useMediaQuery('(max-width:768px)');
  const { classes: c } = createStyleProps({});
  const { openedd, openFilter, isFilter, setOpened, setIsFilter } = UseFilterRequestBalance();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Modal
      closeButtonProps={{
        children: <XCircle />,
      }}
      overlayProps={{ opacity: 0.5, blur: 4 }}
      opened={openedd}
      centered
      onClose={() => setOpened(false)}
      className={c.BoxWeb}
    >
      <Flex className={c.boxContent}>
        <SearchForm />
      </Flex>
    </Modal>
  );
});
const createStyleProps = createStyles((theme, params: InPropsStyle) => ({
  BoxWeb: {
    '.mantine-3cevnw': {
      width: '100%',
      borderRadius: '20px',
    },
    '.mantine-19pz3dh': {
      display: 'none',
    },
    '.mantine-1q36a81': {
      padding: '0',
    },
    '.mantine-1okntaj': {
      marginTop: '47px',
    },
    '.mantine-1yganro': {
      marginBottom: '34px',
    },
    '.mantine-qgvp41': {
      marginTop: '26px',
    },
  },
  boxContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
}));
