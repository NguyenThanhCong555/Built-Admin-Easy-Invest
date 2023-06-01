import React, { createContext, useContext, useState } from 'react';
import { getDateAfter } from 'utils/helpers/getDateAfter';
export interface IFilterCard {
  children: any;
}

export interface IFilterCardBalance {
  openedd: boolean;
  active: number;
  isFilter: boolean;
  filter: {
    start: Date;
    end: Date;
    request_id: string;
    requester_phone: string;
    status: number;
  };
  setActive: React.Dispatch<React.SetStateAction<number>>;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setFilter: React.Dispatch<
    React.SetStateAction<{
      start: Date;
      end: Date;
      request_id: string;
      requester_phone: string;
      status: number;
    }>
  >;
  openFilter: () => void;
}

export const FilterRequestBalance = createContext<IFilterCardBalance>({
  openedd: false,
  active: 1,
  setActive: () => {},
  isFilter: false,
  filter: {
    start: getDateAfter(new Date(new Date().setHours(0, 0, 0, 0)), 1, -1),
    end: new Date(new Date().setHours(23, 59, 59, 999)),
    request_id: '',
    requester_phone: '',
    status: 0,
  },
  setOpened: () => {},
  setFilter: () => {},
  openFilter: () => {},
  setIsFilter: () => {},
});

export const FilterCardProvider = (props: IFilterCard) => {
  const [openedd, setOpened] = useState(false);
  const [active, setActive] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState({
    start: getDateAfter(new Date(new Date().setHours(0, 0, 0, 0)), 1, -1),
    end: new Date(new Date().setHours(23, 59, 59, 999)),
    request_id: '',
    requester_phone: '',
    status: 0,
  });
  const openFilter = () => {
    setOpened(true);
  };
  return (
    <FilterRequestBalance.Provider
      value={{ openedd, filter, active, isFilter, setFilter, setActive, setOpened, setIsFilter, openFilter }}
    >
      {props.children}
    </FilterRequestBalance.Provider>
  );
};

export const UseFilterRequestBalance = () => useContext(FilterRequestBalance);
