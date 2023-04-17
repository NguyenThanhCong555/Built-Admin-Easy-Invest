import React, { useLayoutEffect, useState } from 'react';
import { Flex, TextInput } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { NavContainer } from 'app/components/navigation/NavContainer';
import { useParams } from 'react-router';
import { HeadInfoCoinBasic } from './components/headWidthInfoCoin';
import { FilledButton } from 'app/components/Button/FilledButton';
import { images } from 'assets/images';
import { useNavigate, useLocation } from 'react-router';
import { useForm } from '@mantine/form';
import {
  checkdataIsDuplicated,
  selectProject,
} from 'store/slice/projects/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { formatCoinUS } from 'utils/helpers/formatCoinUs';
import { useTranslation } from 'react-i18next';
import { projectsActions } from 'store/slice/projects';
import FileUpload from 'app/components/FormProject/FileUpload';

interface InPropsStyle {}
export interface IPayloadChangeInfoProject {
  id?: string;
  coin_id?: string;
  project_id?: string;
  coin_name?: string;
  coin_avatar?: string;
  rate_usdt_coin?: string;
  min_transfer?: string;
}

export type FormInput = {
  id: string;
  coin_id?: string;
  project_id?: string;
  coin_name?: string;
  coin_avatar?: string;
  rate_usdt_coin?: string;
  min_transfer?: string;
};

export const PageEditInfoCoin = () => {
  const { t } = useTranslation();
  const data = useSelector(selectProject);
  const [file, setFile] = useState({ src: '' });
  const [isduplicated, setIsduplicated]: any = useState('');
  const projectId = useParams();
  const form = useForm({
    initialValues: {
      id: '',
      coin_id: '',
      project_id: '',
      coin_name: data.coinInfo.coin_name,
      coin_avatar: '',
      rate_usdt_coin: data.coinInfo.rate_usdt_coin,
      min_transfer: data.coinInfo.min_transfer,
    },
    validate: {
      coin_name: value =>
        data.dataIsDuplicated?.includes(value)
          ? 'Tên đã bị trùng, vui lòng nhập lại!'
          : value === 'USDT'
          ? 'Tên đã bị trùng, vui lòng nhập lại!'
          : value === 'usdt'
          ? 'Tên đã bị trùng, vui lòng nhập lại!'
          : null,
    },
  });
  const dispatch = useDispatch();
  const params = useParams();
  const nav = useNavigate();
  const { classes: c } = createStyleProps({});

  const submitInfoProject = (values: FormInput) => {
    const coinName: any = values?.coin_name;

    const payload: IPayloadChangeInfoProject = {
      id: data.coinInfo.id,
      coin_id: values.coin_id,
      project_id: params.projectId,
      coin_name: coinName.toUpperCase(),
      coin_avatar: values.coin_avatar,
      rate_usdt_coin: values.rate_usdt_coin,
      min_transfer: values.min_transfer,
    };
    dispatch(projectsActions.requestEditInfoCoin(payload));
    setTimeout(() => {
      nav(-1);
    }, 300);
  };

  const changrIndoProoject: any = (values: FormInput) => {
    setIsduplicated(values?.coin_name);

    dispatch(projectsActions.ifdataisduplicated(values?.coin_name));
  };

  console.log(data.dataIsDuplicated, 'this is data doubleeeeeeeeee');

  useLayoutEffect(() => {
    dispatch(projectsActions.ifdataisduplicated(isduplicated));
  }, [isduplicated]);

  return (
    <>
      <NavContainer isbackpage={true} laberHeader={'Play Together'}>
        <HeadInfoCoinBasic
          backRole={`/project-details/${projectId?.projectId}`}
          label={t('projectDetail.Coin information')}
        >
          <form
            style={{
              width: '100%',
              marginLeft: '13px',
              marginRight: '13px',
              marginBottom: '13px',
            }}
            encType="multipart/form-data"
            onChange={form.onSubmit(values => changrIndoProoject(values))}
            onSubmit={form.onSubmit(values => submitInfoProject(values))}
          >
            <Flex className={c.optionEdit}>
              <Flex className="sendNameCoin">
                <TextInput
                  placeholder={data.coinInfo?.coin_name}
                  label={t('projectDetail.Enter coin name')}
                  withAsterisk
                  {...form.getInputProps('coin_name')}
                />
                <TextInput
                  placeholder={formatCoinUS(data.coinInfo?.rate_usdt_coin)}
                  label={t('projectDetail.USDT/COIN Rate')}
                  withAsterisk
                  {...form.getInputProps('rate_usdt_coin')}
                />
                <TextInput
                  withAsterisk
                  placeholder={formatCoinUS(data.coinInfo?.min_transfer)}
                  label={t('projectDetail.Minimum transferable value')}
                  {...form.getInputProps('min_transfer')}
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
}));
