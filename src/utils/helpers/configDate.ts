import React from 'react';

export const configDate = (value: any) => {
  const timestamp = value;
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
export const configDateV2 = (value: any) => {
  const timestamp = value;
  const date = new Date(timestamp);

  const formattedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return formattedDate;
};
