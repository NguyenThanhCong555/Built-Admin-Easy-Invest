import React from 'react';

export const fomatDate = dateNumber => {
  const timestamp = dateNumber; // dãy số cần chuyển đổi
  const date = new Date(timestamp); // tạo đối tượng Date từ dãy số

  const day = date.getDate().toString().padStart(2, '0'); // lấy ngày và định dạng 2 chữ số (vd: 01, 02...)
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // lấy tháng và định dạng 2 chữ số
  const year = date.getFullYear(); // lấy năm

  const formattedDate = `${day}/${month}/${year}`; // ghép chuỗi thành định dạng ngày/tháng/năm

  return formattedDate;
};
