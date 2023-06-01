import React, { forwardRef, useEffect, useState } from 'react';
import { Flex, Group, Image, Select, Stack, Text, TextInput, createStyles } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import OptimizedInput from 'app/components/FormProject/OptimizedInput';
import FileUpload from 'app/components/FormProject/FileUpload';
import { bankList } from '../data';

interface BankFormProps {
  form: UseFormReturnType<any>;
  inputRef: any;
  setDisable?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ image, label, description, ...others }: ItemProps, ref) => {
  const { classes } = makeStyles();

  return (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Image src={image} width={50} fit="contain" />

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  );
});

const BankForm = ({ form, inputRef, setDisable }: BankFormProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();

  const [file, setFile] = useState<any>({ src: '' });
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (form.values.qr !== '') {
      setFile({
        src: form.values.qr,
        done: true,
      });
    }

    return () => {
      form.clearErrors();
      setDisable?.(false);
    };
  }, []);

  function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toUpperCase();
    str = str.replace(/\d+/g, '');
    str = str.replace(/[-+/;\\!@#$%^&*(),.?"':{}|<>]/g, '');
    str = str.replace(/a|à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'A');
    str = str.replace(/a|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/ê|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'E');
    str = str.replace(/ê|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/i|ì|í|ị|ỉ|ĩ/g, 'I');
    str = str.replace(/i|Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/o|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'O');
    str = str.replace(/o|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/u|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'U');
    str = str.replace(/u|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/y|ỳ|ý|ỵ|ỷ|ỹ/g, 'Y');
    str = str.replace(/y|Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/d|đ/g, 'D');
    str = str.replace(/d|Đ/g, 'D');
    return str;
  }

  useEffect(() => {
    const list = bankList?.map((item, _) => ({
      value: `${item?.name},${item?.fullName},${item?.bankLogoUrl}`,
      label: `${item?.name}`,
      image: item?.bankLogoUrl,
    }));

    setData(list);
  }, [bankList]);

  function handleChangeAccountNumber(e) {
    const value = removeAscent(e.target.value);
    form.getInputProps('name').onChange(value);
  }

  return (
    <Stack>
      <Flex className={classes.flex}>
        <Stack className={classes.stack}>
          <Select
            withAsterisk
            label={t('bankManagement.Select Bank')}
            {...form.getInputProps('nameBank')}
            placeholder={t('bankManagement.Enter bank name')}
            itemComponent={SelectItem}
            searchable
            classNames={{ input: classes.input, label: classes.label, rightSection: classes.rightSection }}
            rightSection={<></>}
            nothingFound={t('bankManagement.Bank name not found')}
            data={data}
            ref={el => (inputRef.current[0] = el)}
            data-label="nameBank"
          />

          <TextInput
            label={t('bankManagement.Account number')}
            placeholder={t('bankManagement.Enter account number')}
            withAsterisk
            {...form.getInputProps('account_number')}
            classNames={{ input: classes.input, label: classes.label }}
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            ref={el => (inputRef.current[1] = el)}
            data-label="account_number"
          />
        </Stack>

        <FileUpload
          label="QR Code"
          file={file}
          setFile={setFile}
          form={form}
          error={form?.errors?.qr}
          field="qr"
          setDisable={setDisable}
        />
      </Flex>
      <OptimizedInput
        label={t('bankManagement.Account owner')}
        form={form}
        require={true}
        placeholder={t('bankManagement.Enter account owner')}
        field="name"
        isUppercase={true}
        onChangeInput={handleChangeAccountNumber}
        ref={el => (inputRef.current[2] = el)}
      />
    </Stack>
  );
};

const makeStyles = createStyles(() => ({
  flex: {
    gap: 16,
  },
  stack: {
    flex: 1,
    justifyContent: 'space-between',
  },

  button: {
    fontSize: '16px !important',
  },

  form: {
    marginTop: 18,
  },

  input: {
    border: '1px solid #929292',
    height: 44,
    borderRadius: 8,

    ':focus, :focus-within': {
      borderColor: 'var(--primary-2)',
    },
  },

  label: {
    fontSize: 14,
    fontWeight: 600,
  },

  rightSection: {
    pointerEvents: 'none',
  },
}));

export default BankForm;
