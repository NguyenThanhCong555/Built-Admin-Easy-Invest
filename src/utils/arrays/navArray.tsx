import React from 'react';
import { ReactComponent as Triangle } from 'assets/icons/header/arrows-triangle.svg';
import { ReactComponent as Bar } from 'assets/icons/header/bar-chart.svg';
import { ReactComponent as Users } from 'assets/icons/header/users.svg';
export const navArray = [
  {
    icon: <Triangle />,
    name: 'Transaction management',
    navigate: '/transaction',
  },
  {
    icon: <Bar />,
    name: 'Statistics',
    navigate: '/statistics',
  },
  {
    icon: <Users />,
    name: 'Investor management',
    navigate: '/investor',
  },
];
