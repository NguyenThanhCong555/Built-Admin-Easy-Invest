export const formatCoinUS = (value: any) => {
  if (value !== null && value !== undefined) {
    if (value === 0) {
      return '0.000';
    } else {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }
};
