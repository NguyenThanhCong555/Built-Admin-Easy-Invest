import { getCookie } from './getCookie';

export const checkDeviceId = () => {
  const value = getCookie('device_id_iz');
  if (value) return;
  const key = 'device_id_iz=';
  const idRandom = Math.floor(Math.random() * 1000000000000);
  var now = new Date();
  var expireTime = now.getTime() + 1000 * 60 * 60 * 24 * 365; // Thời gian hết hạn sau 1 năm
  now.setTime(expireTime);
  document.cookie = key + idRandom + ';expires=' + now.toUTCString();
};
