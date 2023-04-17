import React from 'react';
import { Doughnut } from 'react-chartjs-2';
export const Mydounous = () => {
  const data = {
    labels: ['Green', 'Orange', 'Purple'],
    datasets: [
      {
        label: '# of Votes',
        color: 'white',
        data: [25, 25, 50],
        backgroundColor: ['#36CA68', '#FFA800', '#976FEA'],
        borderColor: ['white', 'white', 'white'],
        borderRadius: [5, 5, 5],
        hoverBorderColor: 'white',
        textColor: 'white',
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return <Doughnut data={data} options={options} />;
};
