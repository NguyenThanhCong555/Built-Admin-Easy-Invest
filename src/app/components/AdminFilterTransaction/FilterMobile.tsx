import { Drawer, Flex, createStyles } from '@mantine/core';
import React, { memo, useMemo } from 'react';
import { UseFilterRequestBalance } from './filterCard';
import { ReactComponent as XCircle } from 'assets/icons/modal/x-circle.svg';
import SearchForm from './components/SearchForm';
import { useMediaQuery } from '@mantine/hooks';

interface InPropsStyle {}
const FilterMobile = memo(() => {
  const mobile = useMediaQuery('(max-width:768px)');
  const { openedd, setOpened } = UseFilterRequestBalance();
  const { classes: c } = createStyleProps({});
  return (
    <Drawer
      closeButtonProps={{
        children: <XCircle />,
      }}
      opened={openedd}
      onClose={() => setOpened(false)}
      position="bottom"
      size="70%"
      overlayProps={{ opacity: 0.5, blur: 4 }}
      className={c.BoxWeb}
    >
      <Flex className={c.boxContent}>{<SearchForm />}</Flex>
    </Drawer>
  );
});
const createStyleProps = createStyles((theme, params: InPropsStyle) => ({
  BoxWeb: {
    '.mantine-38cpnq': {
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
    },
    '.mantine-3cevnw': {
      width: '100%',
      // border-radius: 20px !important;
      borderRadius: '20px !important',
    },
    '.mantine-1q36a81': {
      padding: '0',
    },
    '.mantine-19pz3dh': {
      display: 'none',
    },
    '.mantine-d41r98': {
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
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
    height: '100%',
  },
}));

export default FilterMobile;
