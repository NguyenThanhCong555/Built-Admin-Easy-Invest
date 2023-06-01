import React from 'react';

import { ReactComponent as IconProjectManagement } from 'assets/icons/menu/projectManagement1.svg';
import { ReactComponent as IconUserManagement } from 'assets/icons/menu/userManagement2.svg';
import { ReactComponent as IconBrowseUserRequirements } from 'assets/icons/menu/browseUserRequirements3.svg';
import { ReactComponent as IconBrowseAdminRequirements } from 'assets/icons/menu/browseAdminRequirements4.svg';
import { ReactComponent as IconSearch5 } from 'assets/icons/menu/search5.svg';
import { ReactComponent as IconBankInformationManagement } from 'assets/icons/menu/bankInformationManagement6.svg';

export type TDataMenu = {
  id: number;
  iconLeft: React.ReactNode;
  label: string;
  navigate?: string;
  submenu?: { id: number; label: string; navigate?: string }[];
  role?: number;
};

export const dataMenu: TDataMenu[] = [
  {
    id: 1,
    iconLeft: <IconProjectManagement style={{ minWidth: '24px', minHeight: '24px' }} />,
    label: 'Header.project-management',
    navigate: '/project-management',
  },
  {
    id: 2,
    iconLeft: <IconUserManagement style={{ minWidth: '24px', minHeight: '24px' }} />,
    label: 'Header.user-management',
    navigate: '/user-management',
  },
  {
    id: 3,
    iconLeft: <IconBrowseUserRequirements style={{ minWidth: '24px', minHeight: '24px' }} />,
    label: 'Header.browse-user-requests',
    submenu: [
      {
        id: 1,
        label: 'Header.submenu-recharge-request',
        navigate: '/approves-recharge',
      },
      {
        id: 2,
        label: 'Header.submenu-withdraw-request',
        navigate: '/approves-withdraw',
      },
      {
        id: 3,
        label: 'Header.submenu-withdrawGame-request',
        navigate: '/approves-withdraw-game',
      },
    ],
  },
  {
    id: 4,
    iconLeft: <IconBrowseAdminRequirements style={{ minWidth: '24px', minHeight: '24px' }} />,
    label: 'Header.browse-admin-requests',
    submenu: [
      {
        id: 1,
        label: 'Header.submenu-request-plus',
        navigate: '/request-plus',
      },
      {
        id: 2,
        label: 'Header.submenu-request-deduction',
        navigate: '/request-deduction',
      },
    ],
    role: 2,
  },
  {
    id: 5,
    iconLeft: <IconSearch5 style={{ minWidth: '24px', minHeight: '24px' }} />,
    label: 'Header.search',
    navigate: '/balance-fluctuations',
  },
  {
    id: 6,
    iconLeft: <IconBankInformationManagement style={{ minWidth: '24px', minHeight: '24px' }} />,
    label: 'Header.bank-information-management',
    navigate: '/bank-management',
  },
];
