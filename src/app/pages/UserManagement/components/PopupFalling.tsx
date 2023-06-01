import React, { useEffect, useRef, useState } from 'react';
import { Box, Modal, createStyles, keyframes } from '@mantine/core';
import { variable } from 'styles/variable';
import { useMediaQuery } from '@mantine/hooks';
import { translations } from 'locales/translations';

type Props = {
  open: boolean;
  onClose: () => void;
  children: any;

  h?: number | string;
  hmb?: number | string;
};

// Export animation to reuse it in other components
export const openPopupAnimation = keyframes({
  from: { transform: 'translate(0, 70%)' },
  to: { transform: 'translate(0, 0)' },
});
export const openPopupAnimationWeb = keyframes({
  from: { opacity: '0' },
  to: { transform: '1' },
});

export const closePopupAnimation = keyframes({
  to: { transform: 'translate(0, 0)' },
  from: { transform: 'translate(0, 70%)' },
});

const PopupFalling = (props: Props) => {
  const smallThan576 = useMediaQuery('(max-width:576px)');
  const popupInnerMobileRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (props.open) {
      setIsOpen(true);
    } else {
      if (!props.open && popupInnerMobileRef.current) {
        popupInnerMobileRef.current.style.transform = 'translate(0, 100%)';

        setTimeout(() => setIsOpen(false), 500);
      } else {
        setIsOpen(false);
      }
    }
  }, [props.open]);

  const { classes } = useStyle({ isOpen: isOpen });

  return (
    <>
      {isOpen && (
        <Box className={classes.box} onClick={event => props.onClose()}>
          {smallThan576 ? (
            <Box onClick={e => e.stopPropagation()} ref={popupInnerMobileRef} h={props.hmb} className={classes.popupInnerMobile}>
              {props.children}
            </Box>
          ) : (
            <Box onClick={e => e.stopPropagation()} h={props.h} className={classes.popupInner}>
              {props.children}
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

const useStyle = createStyles((theme, params: { isOpen: boolean }) => ({
  box: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    background: ' rgba(21, 11, 13, 0.4)',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999999,

    '@media (max-width:576px)': {
      alignItems: 'flex-end',
    },
  },

  popupInner: {
    width: '100%',
    maxWidth: '630px',
    background: variable.neutral.white,
    padding: '12px 16px',
    borderRadius: '14px 14px 0px 0px',
    overflow: 'scroll',
    /* Hide scrollbar for Chrome, Safari and Opera */
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    /* Hide scrollbar for IE, Edge and Firefox */
    msOverflowStyle: 'none' /* IE and Edge */,
    scrollbarWidth: 'none' /* Firefox */,
    animation: `${openPopupAnimationWeb} 0.5s`,
    transition: 'opacity 0.5s',
  },
  popupInnerMobile: {
    // height: '70%',
    width: '100%',
    padding: '12px 16px',
    background: variable.neutral.white,
    borderRadius: '14px 14px 0px 0px',
    overflow: 'scroll',
    /* Hide scrollbar for Chrome, Safari and Opera */
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    /* Hide scrollbar for IE, Edge and Firefox */
    msOverflowStyle: 'none' /* IE and Edge */,
    scrollbarWidth: 'none' /* Firefox */,
    animation: `${openPopupAnimation} 0.6s`,
    transition: 'transform 0.5s',
  },
}));

export default PopupFalling;
