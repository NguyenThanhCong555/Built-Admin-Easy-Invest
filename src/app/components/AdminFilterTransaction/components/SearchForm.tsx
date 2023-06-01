import { Button, Center, Flex, Grid, Stack, Text, TextInput, createStyles } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import React, { memo, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { searchAction } from 'store/slice/search';
import { validate } from 'webpack';
import { UseFilterRequestBalance } from '../filterCard';
import { TransactionType, dataDate } from './data';
import { FilledButton } from 'app/components/Button/FilledButton';
import { useMediaQuery } from '@mantine/hooks';

export interface IPropsSearch {}
interface InPropsStyle {
  isActiveBut: number;
}

const SearchForm = memo((props: IPropsSearch) => {
  const { t } = useTranslation();
  const mobile = useMediaQuery('(max-width:768px)');
  const dispatch = useDispatch();
  const { filter, active, setActive, setOpened, setFilter } = UseFilterRequestBalance();
  const [isActiveBut, setIsActiveBut] = useState(null);
  const [isActiveType, setIsActiveType] = useState<any>(null);
  const [isActiveButAll, setIsActiveButAll] = useState<any>(false);
  const [getService, setGetService] = useState('');

  const ref = useRef<any>();

  const form = useForm({
    initialValues: {
      inputSearch: '',
    },
    validate: {
      inputSearch: value => {
        if (value.trim().length < 8) {
          return t('Login.Please enter your registered phone number');
        }
      },
    },
  });

  const searchSubmit = useCallback(
    e => {
      const payload = {
        service: getService,
        page: 1,
      };
      dispatch(searchAction.requestGetDataFilter(payload));
      setOpened(false);
    },
    [getService],
  );

  const { classes: c } = createStyleProps({ isActiveBut: Number(isActiveBut) });
  const activeMonth = i => {
    setIsActiveBut(i);
    console.log(isActiveBut, 'sđá');
  };
  const isGetAll = () => {
    setIsActiveButAll(!isActiveButAll);
  };
  const getidRoleStatus = i => {
    setGetService(i);
    setIsActiveType(i - 1);
  };

  const resetData = () => {
    setOpened(false);
  };
  return (
    <Flex className={c.boxSearchInput}>
      <form
        onSubmit={form.onSubmit(e => {
          searchSubmit(e);
        })}
      >
        <Flex sx={{ width: '92%', flexDirection: 'column', margin: '0px auto' }}>
          <Text className={c.text}>{t('RequestSearch.Phone number')}</Text>
          <TextInput type="number" className={c.searchInput} placeholder="+84" {...form.getInputProps('inputSearch')} />
        </Flex>
        {/* date input */}
        <Stack w={'100%'} h={'auto'}>
          <Flex sx={{ width: '92%', flexDirection: 'column', margin: '0px auto' }}>
            <Text mb={18} className={c.text}>
              {t('filter.Time')}
            </Text>
            <Flex mb={16} className={c.dateInput}>
              <DateInput
                value={filter.start}
                valueFormat="DD/MM/YYYY"
                locale="vi"
                classNames={{ root: c.inputDateRoot, input: c.inputDate }}
                dateParser={value => {
                  const date = value.split('/');
                  const newDate = new Date(Number(date[2]), Number(date[1]) - 1, Number(date[0]));
                  return newDate;
                }}
                onChange={value => {
                  setFilter({ ...filter, start: value as Date, end: filter.end });
                  setActive(0);
                }}
                maxDate={filter.end}
              ></DateInput>
              <Text sx={{ fontSize: '14px', fontWeight: 400, color: 'var(--grey-dark)' }}>đến</Text>
              <DateInput
                value={filter.end}
                valueFormat="DD/MM/YYYY"
                locale="vi"
                classNames={{ root: c.inputDateRoot, input: c.inputDate }}
                dateParser={value => {
                  const date = value.split('/');
                  const newDate = new Date(Number(date[2]), Number(date[1]) - 1, Number(date[0]));
                  return newDate;
                }}
                minDate={filter.start}
                onChange={value => {
                  setFilter({ ...filter, start: filter.start, end: value as Date });
                  setActive(0);
                }}
              ></DateInput>
            </Flex>
            <Flex mb={14} className={c.buttonMonth}>
              {dataDate?.map((v, i) => {
                return (
                  <Flex
                    sx={{
                      background: isActiveBut == i ? 'var(--primary-5)' : '#F3F3F3',
                      '.mantine-5kl8hv': {
                        color: isActiveBut == i ? '#000000' : 'var(--grey-dark)',
                      },
                    }}
                    key={i}
                    onClick={() => activeMonth(i)}
                    className={c.childMonth}
                  >
                    <Text className={c.textMonth}>{t(`${v.dataDate}`)}</Text>
                  </Flex>
                );
              })}
            </Flex>
            <Text mb={18} className={c.text}>
              {t('RequestSearch.transactiontype2')}
            </Text>
            <Flex className={c.boxType}>
              <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {TransactionType.map((v, i) => {
                  return (
                    <Grid.Col
                      sx={{
                        background: isActiveType == i ? 'var(--primary-5)' : '#F3F3F3',
                        maxWidth: mobile ? '100px' : '126px',
                      }}
                      key={i}
                      onClick={() => getidRoleStatus(v.id)}
                      className={c.childMonth2}
                      span={4}
                    >
                      <Center>
                        <Text
                          sx={{
                            fontSize: '16px',
                            fontWeight: 500,
                            color: '#000000',
                          }}
                        >
                          {t(`${v.trans}`)}
                        </Text>
                      </Center>
                    </Grid.Col>
                  );
                })}
              </Grid>
              <Center
                onClick={() => isGetAll()}
                sx={{
                  background: isActiveButAll ? 'var(--primary-5)' : '#F3F3F3',
                }}
                className={c.butAll}
              >
                <Text mb={2.5} className={c.text}>
                  {t('RequestSearch.all')}
                </Text>
              </Center>
            </Flex>
          </Flex>
          <Flex className={c.ButSubmit}>
            <Button onClick={() => resetData()} className={c.makeNew}>
              <Text>{t('filter.Refresh')}</Text>
            </Button>
            <Button type="submit" className={c.filterNow}>
              <Text>{t('filter.Filter')}</Text>
            </Button>
          </Flex>
        </Stack>
      </form>
    </Flex>
  );
});
const createStyleProps = createStyles((theme, params: InPropsStyle) => ({
  ButSubmit: {
    width: '100%',
    justifyContent: 'space-evenly',
    padding: '13px',
    background: '#F3F3F3',
    marginTop: '15px',
  },
  makeNew: {
    maxWidth: '167px',
    width: '100%',
    height: '45px',
    borderRadius: '8px',
    background: 'white',
    ':hover': {
      boxShadow: `var(--shadow-hover)`,
      background: 'white',
    },

    border: '1px solid var(--primary-1)',
    '& :first-of-type': { fontSize: '16px', fontWeight: 700, color: 'var(--primary-1)' },
    transition: 'all .05s linear',
    ':active': {
      transform: 'translateY(1px)',
    },
  },
  filterNow: {
    maxWidth: '167px',
    width: '100%',
    height: '45px',
    background: 'var(--primary-1)',
    borderRadius: '8px',
    ':hover': {
      background: 'var(--primary-1)',
      boxShadow: `var(--shadow-hover)`,
    },
    border: '1px solid var(--primary-1)',
    '& :first-of-type': { fontSize: '16px', fontWeight: 700, color: 'white' },
    transition: 'all .05s linear',
    ':active': {
      transform: 'translateY(1px)',
    },
  },

  butAll: {
    maxWidth: '100%',
    width: '100%',
    height: '40px',
    background: '#F3F3F3',
    borderRadius: '8px',
    marginTop: '17px',
    ':hover': {
      background: 'var(--primary-5)',
      boxShadow: `var(--shadow-hover)`,
    },
    transition: 'all .05s linear',
    ':active': {
      transform: 'translateY(1px)',
    },
  },
  boxType: {
    flexDirection: 'column',
    width: '100%',
    marginTop: '-5px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMonth: {
    fontSize: '14px',
    fontWeight: 400,
    color: 'var(--grey-dark)',
  },
  childMonth2: {
    width: '100%',
    height: '40px',
    margin: '3px',
    borderRadius: '8px',
    background: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all .05s linear',
    ':active': {
      transform: 'translateY(1px)',
    },
    ':hover': {
      background: 'var(--primary-5)',
      boxShadow: `var(--shadow-hover)`,
    },
  },
  childMonth: {
    maxWidth: '76px',
    width: '100%',
    margin: '3px',
    height: '26px',
    background: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
      background: 'var(--primary-5)',
      boxShadow: `var(--shadow-hover)`,
    },
    transition: 'all .05s linear',
    ':active': {
      transform: 'translateY(1px)',
    },
  },
  buttonMonth: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  inputDateRoot: {},
  input: {
    height: 46,
    borderRadius: 8,
    fontSize: 16,

    ':focus, :focus-within': {
      borderColor: 'var(--primary-2)',
    },
  },
  inputDate: {
    backgroundColor: 'var(--white-light)',
    fontSize: 16,
    width: '137px',
    fontWeight: 500,
    border: 'none',
    borderRadius: '8px',
    textAlign: 'center',
    height: 40,

    ':focus': {
      borderColor: 'var(--primary-2)',
    },
  },
  label: {
    fontSize: 16,
    fontWeight: 700,
  },
  dateInput: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '-10px',
  },
  boxSearchInput: {
    flexDirection: 'column',
    width: '100%',
    transition: 'all .1s linear',
    zIndex: 1000000,
  },
  text: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'black',
    marginBottom: '4px',
  },
  searchInput: {
    width: '100%',
    '.mantine-g9emdi': {
      borderRadius: '8px',
      height: '42px',
      color: 'var(--grey-dark)',
      border: '1px solid var(--grey-dark)',
    },
  },
}));

export default SearchForm;
