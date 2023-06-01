import React from 'react';

export const clearPhoneCode84 = phoneCode => {
  let number = phoneCode;
  let replacedNumber = number?.replace(/^84/, '0');
  return replacedNumber;
};
