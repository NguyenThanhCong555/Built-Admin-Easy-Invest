import React, { Dispatch, SVGProps, SetStateAction, useState } from 'react';
import { Box, createStyles, Flex, Stack, Text } from '@mantine/core';

import { media } from 'styles/media';
import { ReactComponent as CaretDown } from 'assets/icons/homePage/caret-down.svg';
import { ReactComponent as VN } from 'assets/icons/loginPage/vn-ensign.svg';
import { countryArray } from 'utils/arrays/countryArray';

interface IconComponentProps {
  Icon: React.FunctionComponent<SVGProps<SVGSVGElement>>;
}

function IconComponent({ Icon }: IconComponentProps) {
  return <Icon />;
}
interface Props {
  onCode: Dispatch<SetStateAction<number>>;
}
function Country({ onCode }: Props) {
  // Local
  const { classes } = makeStyles();
  // State
  const [isShow, setIsShow] = useState<boolean>(false);
  const [ensign, setEnsign] = useState<typeof VN | null>(VN);

  // Function
  const handleSelectCountry = item => {
    setEnsign(item.ensign);
    onCode(item.code);
  };
  return (
    <Stack
      className={classes.container}
      onClick={() => {
        setIsShow(prev => !prev);
      }}
    >
      <Flex className={classes.langSelect}>
        {ensign && <IconComponent Icon={ensign} />}
        <Box className={classes.caretIcon}>
          <CaretDown />
        </Box>
      </Flex>
      {isShow && (
        <Stack className={classes.optionWrapper}>
          {countryArray.map((item, index) => (
            <Flex
              key={index}
              sx={{
                gap: 5,
                alignItems: 'center',
                padding: '6px 8px 8px',
                borderRadius: 0,
                ':hover': {
                  backgroundColor: '#ced4da',
                },
                ':first-of-type': {
                  borderRadius: '8px 8px 0px 0px',
                },
                ':last-of-type': {
                  borderRadius: '0px 0px 8px 8px',
                },
                ':not(:last-of-type)': {
                  borderBottom: '0.4px solid var(--grey-medium)',
                },
              }}
              onClick={() => handleSelectCountry(item)}
            >
              <IconComponent Icon={item.ensign} />
              <Text className={classes.optionText}>{item.country}</Text>
            </Flex>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default Country;

const makeStyles = createStyles(() => ({
  container: {
    height: '100%',
    width: 84,
    position: 'relative',
    borderRadius: '8px 0px 0px 8px',
    backgroundColor: 'var(--primary-1)',
    cursor: 'pointer',
  },
  langSelect: {
    gap: 8,
    width: '100%',
    height: '100%',
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px 6px',
  },
  optionText: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '18px',
    userSelect: 'none',
    color: '#000',
  },
  optionWrapper: {
    gap: 0,
    background: '#FFFFFF',
    borderRadius: 8,
    cursor: 'pointer',
    position: 'absolute',
    bottom: -82,
    left: '-2%',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    zIndex: 99,
    [media.small()]: {
      left: '-6%',
      bottom: -90,
    },
  },
  caretIcon: {
    color: 'var(--white)',
  },
}));
