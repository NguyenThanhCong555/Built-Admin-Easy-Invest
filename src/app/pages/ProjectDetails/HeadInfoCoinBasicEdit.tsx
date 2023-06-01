import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Flex, TextInput } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { NavContainer } from 'app/components/navigation/NavContainer';
import { useParams } from 'react-router';
import { HeadInfoCoinBasic } from './components/headWidthInfoCoin';
import { FilledButton } from 'app/components/Button/FilledButton';
import { images } from 'assets/images';
import { useNavigate, useLocation } from 'react-router';
import { useForm } from '@mantine/form';
import { checkdataIsDuplicated, selectProject } from 'store/slice/projects/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { formatCoinUS } from 'utils/helpers/formatCoinUs';
import { useTranslation } from 'react-i18next';
import { projectsActions } from 'store/slice/projects';
import FileUpload from 'app/components/FormProject/FileUpload';
import { useInputState } from '@mantine/hooks';

interface InPropsStyle {}
export interface IPayloadChangeInfoProject {
  id?: string;
  coin_id?: string;
  project_id?: string;
  coin_name?: string;
  coin_avatar?: string;
  rate_usdt_coin?: string;
  min_transfer?: string;
  purchase_fee?: string;
  selling_fee?: string;
}

export type FormInput = {
  id: string;
  coin_id?: string;
  project_id?: string;
  coin_name?: string;
  coin_avatar?: string;
  rate_usdt_coin?: string;
  min_transfer?: string;
  purchase_fee?: string;
  selling_fee?: string;
};

export const PageEditInfoCoin = () => {
  const { t } = useTranslation();
  const data = useSelector(selectProject);

  const [file, setFile] = useState({
    src: `${data.coinInfo.coin_avatar}`,
    done: true,
  });
  const [isduplicated, setIsduplicated]: any = useState('');
  const projectId = useParams();
  const dataDulicate = useSelector(checkdataIsDuplicated);
  const [focus1, setFocus1] = useState<any>('');

  const isDuplicated = (array, value, valueToExclude) => {
    return array?.filter(element => element !== valueToExclude)?.includes(value?.trim()?.toUpperCase());
  };

  const form = useForm({
    initialValues: {
      id: '',
      coin_id: '',
      project_id: '',
      coin_name: data.coinInfo.coin_name,
      coin_avatar: data.coinInfo.coin_avatar,
      rate_usdt_coin: data.coinInfo.rate_usdt_coin,
      min_transfer: data.coinInfo.min_transfer,
      purchase_fee: data.coinInfo.purchase_fee,
      selling_fee: data.coinInfo.selling_fee,
    },
    validate: {
      coin_name: value => {
        if (value.trim().length < 4) {
          setFocus1(1);
          return t('FormProject.Please enter more than 2 characters !');
        } else if (value.length <= 0 || !value) {
          setFocus1(1);
          return t('FormProject.Please enter project name !');
        } else if (value === 'USDT') {
          setFocus1(1);

          return t('FormProject.The name has been overlapped, please re -enter!');
        } else if (value === 'usdt') {
          setFocus1(1);

          return t('FormProject.The name has been overlapped, please re -enter!');
        } else if (isDuplicated(dataDulicate, value, data.coinInfo.coin_name)) {
          setFocus1(1);

          return t('FormProject.The name has been overlapped, please re -enter!');
        } else if (value.length > 10) {
          setFocus1(1);

          return t('FormProject.Please enter less than or equal 20 characters !');
        } else if (value.trim().length == 0) {
          setFocus1(1);

          return t('FormProject.Please enter the exchange rate !');
        } else {
          return null;
        }
      },
      rate_usdt_coin: value => {
        if (value.length <= 0 || !value) {
          setFocus1(2);

          return t('FormProject.Please enter the exchange rate !');
        } else if (value.length > 100) {
          return t('FormProject.Please enter less than or equal 20 characters !');
        } else {
          setFocus1('');

          return null;
        }
      },
      coin_avatar: value => {
        if (value === 0) return null;
        if (!value) {
          return t('FormProject.Please upload at least 1 photo !');
        } else {
          return null;
        }
      },
      purchase_fee: value => {
        if (value === 0) return null;
        if (!value) {
          return t('projectDetail.Enter user fee to buy coin (%)');
        }

        return null;
      },
      selling_fee: value => {
        if (value === 0) return null;

        if (!value) {
          return t('projectDetail.Enter user fee to sell coin (%)');
        }

        return null;
      },
    },
  });
  const dispatch = useDispatch();
  const params = useParams();
  const nav = useNavigate();
  const { classes: c } = createStyleProps({});

  const submitInfoProject = (values: FormInput) => {
    const coinName: any = values?.coin_name?.trim();
    const payload: IPayloadChangeInfoProject = {
      id: data.coinInfo.id,
      coin_id: values.coin_id,
      project_id: params.projectId,
      coin_name: coinName.toUpperCase().trim(),
      coin_avatar: values.coin_avatar,
      rate_usdt_coin: values.rate_usdt_coin,
      min_transfer: values.min_transfer,
      selling_fee: values?.selling_fee,
      purchase_fee: values?.purchase_fee,
    };
    dispatch(projectsActions.requestEditInfoCoin(payload));
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

  useEffect(() => {
    if (data) {
      setFile({ src: `${data.coinInfo.coin_avatar}`, done: true });
    }
  }, [data]);
  // focus
  const inputs = useRef<any>([]);

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  function handleBlur(index) {
    if (focus1 == 2) {
      inputs.current[0].focus();
    }
    if (index + 1 < inputs.current.length) {
      if (focus1 !== 2) {
        setFocus1(0);
        inputs.current[1].focus();
      }
      inputs.current[index + 1].focus();
      setFocus1(0);
    } else {
      setFocus1(0);
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
                  sx={{
                    '& ::placeholder': { color: '#b3b3b3 !important' },
                  }}
                  placeholder={data.coinInfo?.coin_name}
                  label={t('projectDetail.Enter coin name')}
                  type="text"
                  ref={input => (inputs.current[0] = input)}
                  autoCapitalize="characters"
                  withAsterisk
                  {...form.getInputProps('coin_name')}
                  onBlur={() => handleBlur(0)}
                  classNames={{ input: c.input, label: c.label }}
                  autoFocus
                />
                <TextInput
                  placeholder={formatCoinUS(data.coinInfo?.rate_usdt_coin)}
                  label={t('projectDetail.USDT/COIN Rate')}
                  withAsterisk
                  ref={input => (inputs.current[1] = input)}
                  type="number"
                  {...form.getInputProps('rate_usdt_coin')}
                  onBlur={() => handleBlur(1)}
                  classNames={{ input: c.input, label: c.label }}
                />
                <TextInput
                  placeholder={formatCoinUS(data.coinInfo?.min_transfer)}
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
      overflow: 'hidden',

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
