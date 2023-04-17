import { Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

interface Props {
  valuePhone: string;
  setValuePhone: React.Dispatch<React.SetStateAction<string>>;
  disable?: boolean;
}

export const SelectCountry = (props: Props) => {
  const { t } = useTranslation();

  const mobile: any = useMediaQuery('(max-width:768px)');
  // const [phone, setPhone] = React.useState('');
  const inputStyle = {
    maxWidth: mobile ? '60%' : '80%',
    height: '50px',
    fontSize: '16px',
    padding: '10px',
    outline: 'none',
    textalign: 'center',
  };

  const handleOnChange = (value: string, data: CountryData) => {
    // Remove zero - check country
    const phone = JSON.stringify(parseInt(value.slice(data.dialCode.length)));
    const phoneWithDialCode = data?.dialCode + phone;
    props.setValuePhone(phoneWithDialCode);
  };
  return (
    <Flex
      mt={'65px'}
      justify={'center'}
      align={'center'}
      sx={{ border: '1px solid #929292', borderRadius: '8px' }}
      w={'100%'}
    >
      <Flex
        sx={{
          width: '100%',
          '& .react-tel-input ': {
            width: '100%',
            // placehoder
            '& ::placeholder': {
              color: '#A9A9A9',
              outline: 'none !important',

              fontSize: '16px',
            },
            '& .form-control:focus': {
              background: '#fff',
              borderColor: '#CACACA',
              boxShadow: 'none',
            },
            // end placehoder
            // input:text
            '& .form-control': {
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderLeft: 'none',
              marginLeft: '80px',
              border: 'none',
            },
            // end input:text
            // FLag
            '& .selected-flag:focus': {
              outline: 'none !important',
            },
            '& .selected-flag.open:before': {
              outline: 'none !important',
            },

            '& .selected-flag': {
              background: '#976FEA',
              borderTopLeftRadius: '8px',
              borderBottomLeftRadius: '8px',
              border: '1px solid #CACACA',
              width: '84px',
            },

            // end input:text
          },
          '.react-tel-input .selected-flag:focus:before, .react-tel-input .selected-flag.open:before':
            {
              borderColor: 'transparent',
              boxShadow: '1px 2px 3px transparent',
            },
          '.react-tel-input .flag': {
            width: '25px',
            height: '20px',
            transform: 'scale(1.5)',
            backgroundRepeat: 'no-repeat',
            marginLeft: '4px',
          },
          '.react-tel-input .selected-flag .arrow': {
            position: 'relative',
            top: '50%',
            marginTop: '-1px',
            left: '31px',
            width: '0',
            height: '0px',
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid white',
          },
          '.react-tel-input .selected-flag .arrow.up': {
            borderTop: ' none',
            borderBottom: '5px solid white',
          },
          '.react-tel-input .country-list .flag': {
            position: 'absolute',
            left: '8px',
            top: '8px',
          },
        }}
      >
        <PhoneInput
          country={'vn'}
          countryCodeEditable={false}
          inputStyle={inputStyle}
          enableSearch={true}
          value={props.valuePhone}
          placeholder={t('Account.login.enterPhoneNumber')}
          onChange={handleOnChange}
          disabled={props.disable}
        />
      </Flex>
    </Flex>
  );
};
