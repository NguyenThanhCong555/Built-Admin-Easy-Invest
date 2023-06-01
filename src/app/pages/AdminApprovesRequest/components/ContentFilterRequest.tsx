import React from 'react';
import { Box, Flex, Stack, Text, TextInput, createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { DateInput } from '@mantine/dates';
import { boxContent, statusBox } from '../data/data';
import { OutlineButton } from 'app/components/Button/OutlineButton';
import { FilledButton } from 'app/components/Button/FilledButton';
import { getDateAfter } from 'utils/helpers/getDateAfter';

interface ContentFilterRequestProps {
  filter?: any;
  setFilter?: any;
  active?: any;
  activeStatus?: any;
  setActive?: any;
  setActiveStatus?: any;
  handleFilter?: any;
  handleRefresh?: any;
}

const ContentFilterRequest = ({
  filter,
  setFilter,
  active,
  activeStatus,
  setActive,
  setActiveStatus,
  handleFilter,
  handleRefresh,
}: ContentFilterRequestProps) => {
  const { t } = useTranslation();
  const mobile: boolean = useMediaQuery('(max-width: 768px)');
  const { classes } = makeStyles({ mobile });

  function handleSelectActive(item) {
    setActive(item.id);
    const date = getDateAfter(new Date(new Date().setHours(0, 0, 0, 0)), item.type, item.time);
    setFilter({
      ...filter,
      start: date,
      end: new Date(new Date().setHours(23, 59, 59, 999)),
    });
  }

  function handleSelectActiveStatus(item) {
    setActiveStatus(item.id);
  }

  return (
    <Stack className={classes.stack}>
      <Stack className={classes.stackForm}>
        <TextInput
          value={filter.request_id}
          classNames={{ input: classes.input, label: classes.label }}
          placeholder={t('filter.Enter trading code')}
          label={t('filter.Trading code')}
          onChange={e => {
            setFilter({ ...filter, request_id: e.target.value });
          }}
        />
        <TextInput
          value={filter.requester_phone}
          classNames={{ input: classes.input, label: classes.label }}
          label={t('filter.Phone number')}
          placeholder="+84"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={e => {
            let value = e.target.value;
            setFilter({ ...filter, requester_phone: value });
          }}
        />
      </Stack>
      <Text className={classes.timeTitle}>{t('filter.Time')}</Text>

      <Flex className={classes.flexTime}>
        <DateInput
          value={filter.start}
          valueFormat="DD/MM/YYYY"
          locale="vi"
          classNames={{ root: classes.inputDateRoot, input: classes.inputDate }}
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
        />
        <Text className={classes.toTitle}>{t('filter.to')}</Text>
        <DateInput
          value={filter.end}
          valueFormat="DD/MM/YYYY"
          locale="vi"
          classNames={{ root: classes.inputDateRoot, input: classes.inputDate }}
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
        />
      </Flex>

      <Flex className={classes.flexBox}>
        {boxContent.map((item, index) => (
          <Box
            key={item.id}
            onClick={() => handleSelectActive(item)}
            className={classes.box}
            style={{
              backgroundColor: active == index + 1 ? 'var(--primary-5)' : 'var(--white-light)',
              color: active == index + 1 ? 'var(--black)' : 'var(--grey-dark)',
            }}
          >
            <Text className={classes.boxText}>{t(`filter.${item.name}`)}</Text>
          </Box>
        ))}
      </Flex>
      <Text className={classes.timeTitle}>{t('filter.Status')}</Text>
      <Flex className={classes.flexBox}>
        {statusBox.map((item, index) => (
          <Box
            key={item.id}
            onClick={() => handleSelectActiveStatus(item)}
            className={classes.boxStatus}
            style={{
              flex: 1,
              backgroundColor: activeStatus == index + 1 ? 'var(--primary-5)' : 'var(--white-light)',
              color: activeStatus == index + 1 ? 'var(--black)' : 'var(--grey-dark)',
            }}
          >
            <Text className={classes.boxStatusText}>{t(`filter.${item.label}`)}</Text>
          </Box>
        ))}
      </Flex>

      <Flex className={classes.flexButton}>
        <OutlineButton
          style={{
            flex: 1,
          }}
          h={47}
          onClick={handleRefresh}
        >
          {t('filter.Refresh')}
        </OutlineButton>
        <FilledButton
          style={{
            flex: 1,
          }}
          h={47}
          onClick={handleFilter}
        >
          {t('filter.Filter')}
        </FilledButton>
      </Flex>
    </Stack>
  );
};

const makeStyles = createStyles((theme, { mobile }: { mobile: boolean }) => ({
  stack: {
    height: '100%',
  },
  stackForm: {
    marginTop: 26,
    padding: '0 16px',
  },
  timeTitle: {
    padding: '0 16px 0 16px',
    fontSize: 16,
    fontWeight: 700,
    flexShrink: 0,
  },
  flexTime: {
    padding: '0 16px',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  inputDateRoot: {
    flex: 1,
  },
  inputDate: {
    backgroundColor: 'var(--white-light)',
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
    height: 40,

    ':focus': {
      borderColor: 'var(--primary-2)',
    },
  },
  toTitle: {
    fontSize: 14,
    fontWeight: 400,
    color: 'var(--grey-dark)',
  },
  headerModal: {
    display: 'none',
  },

  flexBox: {
    gap: mobile ? 5 : 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 50,
    flexWrap: 'wrap',
    padding: '0 16px',
  },

  flexButton: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    backgroundColor: 'var(--white-light)',
    padding: 16,
    flex: 1,

    borderBottomRightRadius: !mobile ? 20 : 0,
    borderBottomLeftRadius: !mobile ? 20 : 0,
  },
  box: {
    padding: '4px 10px',
    textAlign: 'center',
    minWidth: 76,
    cursor: 'pointer',
    flex: !mobile ? 1 : 0,
  },

  boxStatus: {
    padding: '9px 10px',
    textAlign: 'center',
    minWidth: 76,
    cursor: 'pointer',
    flex: !mobile ? 1 : 0,
    borderRadius: 8,
  },

  boxText: {
    fontSize: 14,
  },
  boxStatusText: {
    fontSize: 16,
    fontWeight: 500,
  },

  input: {
    border: '1px solid #929292',
    height: 46,
    borderRadius: 8,
    fontSize: 16,

    ':focus, :focus-within': {
      borderColor: 'var(--primary-2)',
    },
  },
  label: {
    fontSize: 16,
    fontWeight: 700,
  },
}));
export default ContentFilterRequest;
