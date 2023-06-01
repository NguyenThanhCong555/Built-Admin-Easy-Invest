import React, { useContext, useLayoutEffect, useState } from 'react';
import { createStyles } from '@mantine/styles';
import { Center, Flex, Stack, Text, TextInput } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { NavContainer } from 'app/components/navigation/NavContainer';
import { useTranslation } from 'react-i18next';
import { ReactComponent as IconFilter } from 'assets/icons/filter.svg';
import { CartRequestSearch } from './components/CartRequestSearch';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { searchAction } from 'store/slice/search';
import { selectDataSearcher } from 'store/slice/search/selector';
import { IStateSearchData } from 'store/slice/search/type';
import { useForm } from '@mantine/form';
import { FilterRequestBalance, UseFilterRequestBalance } from 'app/components/AdminFilterTransaction/filterCard';
import { FilterWeb } from 'app/components/AdminFilterTransaction/FilterWeb';
import FilterMobile from 'app/components/AdminFilterTransaction/FilterMobile';
interface InPropsStyle {
  mobile?: boolean;
}
export const BalanceFluctuations = (props: InPropsStyle) => {
  const { openedd, openFilter, isFilter, setOpened, setIsFilter } = UseFilterRequestBalance();
  const mobile = useMediaQuery('(max-width: 768px)');
  const dataSearch = useSelector(selectDataSearcher);
  const { t } = useTranslation();
  const { classes: c } = createStyleProps({ mobile: mobile });
  const dispatch = useDispatch();
  const isfilter = () => {
    console.log(openedd, 'this is opended');
    openFilter();
  };
  const [apaylpad, setApaylpad] = useState({});
  useLayoutEffect(() => {
    const payload: IStateSearchData = {
      service: '',
      page: 1,
    };
    dispatch(searchAction.requestGetDataFilter(payload));
    setApaylpad(payload);
  }, []);
  console.log(dataSearch);
  const form = useForm({
    initialValues: {
      idSearcher: '',
    },
    validate: {},
  });
  const handleSubmitSearch = e => {
    const payload = {
      transaction_id: e.idSearcher,
    };
    Number(e.idSearcher) == 0 || e.idSearcher == ''
      ? dispatch(searchAction.requestGetDataFilter(apaylpad))
      : dispatch(searchAction.requestGetInfoFilter(payload));

    form.reset();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <NavContainer
        isfilter={true}
        backRole="/"
        propsFilter={
          <Center onClick={isfilter}>
            <IconFilter />
          </Center>
        }
        laberHeader={t('BalanceFunction.Look up fluctuations')}
      >
        <Stack className={c.boxBalance}>
          <form
            className="form"
            onSubmit={form.onSubmit(e => {
              handleSubmitSearch(e);
            })}
          >
            <TextInput
              {...form.getInputProps('idSearcher')}
              placeholder={t('filter.Enter trading code')}
              type="number"
              className={c.textInput}
            />
          </form>
          <Stack w={'100%'} h={'100%'} sx={{ overflow: 'auto' }}>
            {dataSearch.map((v, i) => {
              return (
                <Center key={i}>
                  {v ? (
                    <CartRequestSearch
                      coinAva={v?.coin_avatar}
                      id={v?.id}
                      avatar={v?.user_info.avatar}
                      userName={v?.user_info.name}
                      phoneCode={v?.user_info.phone_number}
                      money={v?.exchange}
                      service={v?.service}
                      transactionCode={v?.id}
                      timeCreated={v?.create_time}
                    ></CartRequestSearch>
                  ) : (
                    <Text>{t('RequestSearch.Code does not exist, please enter the appropriate code!')}</Text>
                  )}
                </Center>
              );
            })}
          </Stack>
        </Stack>
        {!mobile ? <FilterWeb /> : <FilterMobile />}
      </NavContainer>
    </motion.div>
  );
};
const createStyleProps = createStyles((theme, params: InPropsStyle) => ({
  textInput: {
    maxWidth: '95%',
    width: '100%',
    height: '44px',
    borderRadius: '8px',
    border: '1px solid var(--grey-dark)',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    '.mantine-7c7vou': {
      height: '40px',
      maxWidth: '100% !important',
      width: '100%',
      outline: 'none',
      listStyle: 'none',

      '.mantine-g9emdi': {
        border: 'none !important',
        boxShadow: 'none',
      },
    },
  },
  boxBalance: {
    maxWidth: '100%',
    width: '100%',
    height: '647px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',

    '.form': {
      width: '100%',
      '& :first-of-type': {
        margin: '0 auto',
      },
    },
  },
}));
