import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Flex, TextInput } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { NavContainer } from 'app/components/navigation/NavContainer';
import { useParams, useNavigate } from 'react-router';
import { HeadInfoCoinBasic } from './components/headWidthInfoCoin';
import { FilledButton } from 'app/components/Button/FilledButton';
import { images } from 'assets/images';
import { useForm } from '@mantine/form';
import { checkdataIsDuplicated, selectProject } from 'store/slice/projects/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { formatCoinUS } from 'utils/helpers/formatCoinUs';
import { useTranslation } from 'react-i18next';
import { projectsActions } from 'store/slice/projects';
import FileUpload from 'app/components/FormProject/FileUpload';

interface InPropsStyle {}
export interface IPayloadChangeInfoProject {
  project_id?: string;
  coin_name?: string;
  coin_avatar?: string;
  rate_usdt_coin?: string;
  min_transfer?: string;
  purchase_fee?: string;
  selling_fee?: string;
}

export type FormInput = {
  project_id?: string;
  coin_name?: string;
  coin_avatar?: string;
  rate_usdt_coin?: string;
  min_transfer?: string;
  purchase_fee?: string;
  selling_fee?: string;
};

export const PageAddInfoCoin = () => {
  const { t } = useTranslation();
  const data = useSelector(selectProject);
  const projectId = useParams();
  const dispatch = useDispatch();
  const params = useParams();
  const { classes: c } = createStyleProps({});
  const [file, setFile] = useState({ src: '' });
  const nav = useNavigate();
  const [isduplicated, setIsduplicated]: any = useState('');
  const dataDulicate = useSelector(checkdataIsDuplicated);

  const isDuplicated = (array, value, valueToExclude) => {
    return array?.filter(element => element !== valueToExclude)?.includes(value?.trim()?.toUpperCase());
  };
  const form = useForm({
    initialValues: {
      project_id: '',
      coin_name: '',
      coin_avatar: '',
      rate_usdt_coin: '',
      min_transfer: '',
      purchase_fee: '',
      selling_fee: '',
    },
    validate: {
      coin_name: value => {
        if (value.trim().length < 4) {
          return t('FormProject.Please enter more than 2 characters !');
        } else if (value.length <= 0 || !value) {
          return t('FormProject.Please enter project name !');
        } else if (value === 'USDT') {
          return t('FormProject.The name has been overlapped, please re -enter!');
        } else if (value === 'usdt') {
          return t('FormProject.The name has been overlapped, please re -enter!');
        } else if (isDuplicated(dataDulicate, value, data.coinInfo.coin_name)) {
          return t('FormProject.The name has been overlapped, please re -enter!');
        } else if (value.length > 10) {
          return t('FormProject.Please enter less than or equal 20 characters !');
        } else if (value.trim().length == 0) {
          return t('FormProject.Please enter the exchange rate !');
        } else {
          return null;
        }
      },
      rate_usdt_coin: value => {
        if (value.length <= 0 || !value) {
          return t('FormProject.Please enter the exchange rate !');
        } else if (value.length > 100) {
          return t('FormProject.Please enter less than or equal 20 characters !');
        } else {
          return null;
        }
      },
      coin_avatar: value => {
        if (!value) {
          return t('FormProject.Please upload at least 1 photo !');
        } else {
          return null;
        }
      },
      min_transfer: value => {
        if (value.length <= 0 || !value) {
          return t('FormProject.Please enter the exchange rate !');
        } else if (value.length > 100) {
          return t('FormProject.Project name cannot exceed 100 characters');
        } else {
          return null;
        }
      },
      purchase_fee: value => {
        if (value.trim().length <= 0 || !value) {
          return t('projectDetail.Enter user fee to buy coin (%)');
        }

        return null;
      },
      selling_fee: value => {
        if (value.trim().length <= 0 || !value) {
          return t('projectDetail.Enter user fee to sell coin (%)');
        }

        return null;
      },
    },
  });

  const submitInfoProject = (values: FormInput) => {
    const coinName: any = values?.coin_name;
    const payload: IPayloadChangeInfoProject = {
      project_id: params?.projectId?.trim(),
      coin_name: coinName.trim().toUpperCase(),
      coin_avatar: values?.coin_avatar?.trim(),
      rate_usdt_coin: values?.rate_usdt_coin?.trim(),
      min_transfer: values?.min_transfer?.trim(),
      selling_fee: values?.selling_fee?.trim(),
      purchase_fee: values?.purchase_fee?.trim(),
    };
    dispatch(projectsActions.requestAddInfoCoin(payload));
    setTimeout(() => {
      nav(-1);
    }, 400);
  };

  const changrIndoProoject: any = (values: FormInput) => {
    setIsduplicated(values?.coin_name);

    dispatch(projectsActions.ifdataisduplicated(values?.coin_name));
  };

  useLayoutEffect(() => {
    dispatch(projectsActions.ifdataisduplicated(isduplicated));
  }, [isduplicated]);

  useEffect(() => {
    if (data?.id === Number(params.projectId)) return;
    dispatch(projectsActions.requestProjectInfo({ userid: params.projectId }));
  }, [projectId]);

  // focus
  const inputs = useRef<any>([]);

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  function handleBlur(index) {
    if (index + 1 < inputs.current.length) {
      inputs.current[index + 1].focus();
      console.log(index);
    } else {
      return inputs.current[0].focus();
    }
  }
  // end focus
  return (
    <>
      <NavContainer isbackpage={true} laberHeader={data?.name}>
        <HeadInfoCoinBasic backRole={`/project-details/${projectId?.projectId}`} label={t('projectDetail.Coin information')}>
          <form
            style={{
              width: '100%',
              marginLeft: '13px',
              marginRight: '13px',
              marginBottom: '13px',
            }}
            encType="multipart/form-data"
            // onChange={form.onSubmit(values => changrIndoProoject(values))}
            onSubmit={form.onSubmit(values => submitInfoProject(values))}
          >
            <Flex className={c.optionEdit}>
              <Flex className="sendNameCoin">
                <TextInput
                  placeholder={t('projectDetail.Enter coin name')}
                  label={t('projectDetail.Enter coin name')}
                  type="text"
                  ref={input => (inputs.current[0] = input)}
                  onBlur={() => handleBlur(0)}
                  autoCapitalize="characters"
                  withAsterisk
                  {...form.getInputProps('coin_name')}
                  classNames={{ input: c.input, label: c.label }}
                  autoFocus
                />
                <TextInput
                  placeholder={t('projectDetail.USDT/COIN Rate')}
                  label={t('projectDetail.USDT/COIN Rate')}
                  withAsterisk
                  ref={input => (inputs.current[1] = input)}
                  type="number"
                  {...form.getInputProps('rate_usdt_coin')}
                  onBlur={() => handleBlur(1)}
                  classNames={{ input: c.input, label: c.label }}
                />
                <TextInput
                  placeholder={t('projectDetail.Minimum transferable value')}
                  type="number"
                  ref={input => (inputs.current[2] = input)}
                  withAsterisk
                  label={t('projectDetail.Minimum transferable value')}
                  {...form.getInputProps('min_transfer')}
                  onBlur={() => handleBlur(2)}
                  classNames={{ input: c.input, label: c.label }}
                />
                <TextInput
                  placeholder={t('projectDetail.User fee to buy coin (%)')}
                  type="number"
                  // ref={input => (inputs.current[3] = input)}
                  withAsterisk
                  label={t('projectDetail.User fee to buy coin (%)')}
                  {...form.getInputProps('purchase_fee')}
                  // onBlur={() => handleBlur(3)}
                  classNames={{ input: c.input, label: c.label }}
                />
                <TextInput
                  placeholder={t('projectDetail.User fee to sell coin (%)')}
                  type="number"
                  // ref={input => (inputs.current[4] = input)}
                  withAsterisk
                  label={t('projectDetail.User fee to sell coin (%)')}
                  {...form.getInputProps('selling_fee')}
                  // onBlur={() => handleBlur(4)}
                  classNames={{ input: c.input, label: c.label }}
                />
              </Flex>
              <Flex className="inputImage">
                <FileUpload
                  label={t('projectDetail.Image')}
                  file={file}
                  setFile={setFile}
                  field="coin_avatar"
                  form={form}
                  {...form.getInputProps('coin_avatar')}
                />
              </Flex>
              <FilledButton type="submit" h={44} mt={32} fz={'16px !important'}>
                {t('projectDetail.Save')}
              </FilledButton>
            </Flex>
          </form>
        </HeadInfoCoinBasic>
      </NavContainer>
    </>
  );
};

const createStyleProps = createStyles((theme, params: InPropsStyle) => ({
  optionEdit: {
    width: '100%',

    flexDirection: 'column',

    '.sendNameCoin': {
      flexDirection: 'column',
      width: '100%',
      marginTop: '10px',
      marginBottom: '3px',
      gap: 10,

      height: '100%',
      '.mantine-1fzet7j': {
        marginTop: '10px',
        marginBottom: '3px',
        width: '100%',
        fontSize: 18,
        fontWeight: 500,
        color: '#000000',
      },

      '.mantine-g9emdi': {
        height: '44px',
      },
    },

    '.inputImage': {
      width: '100%',
      marginTop: '10px',
      // overflow: 'hidden',

      '.mantine-b11773': {
        fontWeight: 500,
        fontSize: 18,
      },

      '.mantine-7c7vou': {
        maxWidth: '82px',
        width: '100%',
        height: '82px',

        '.mantine-12bzkba': {
          backgroundImage: `url(${images.frameImg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          maxWidth: '82px',
          width: '100%',
          height: '82px',
        },
      },
    },
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
}));
