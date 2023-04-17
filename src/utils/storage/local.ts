export const getLocalStorage = (key: string, property: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    const result = JSON.parse(data);
    return JSON.parse(result[`${property}`]);
  } else {
    return null;
  }
};
