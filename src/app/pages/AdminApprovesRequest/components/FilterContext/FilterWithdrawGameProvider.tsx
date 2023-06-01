import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getDateAfter } from 'utils/helpers/getDateAfter';
import { statusBox } from '../../data/data';

interface FilterRequestProviderProps {
  children?: any;
}

type TFilterRequestContext = {
  opened: boolean;
  active: number;
  activeStatus: number;
  isFilter: boolean;
  refresh: boolean;
  filter: {
    start: Date;
    end: Date;
    request_id: string;
    requester_phone: string;
    status: number;
  };
  filterAgain: boolean;
  setFilter: React.Dispatch<
    React.SetStateAction<{
      start: Date;
      end: Date;
      request_id: string;
      requester_phone: string;
      status: number;
    }>
  >;
  setIsFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  setActiveStatus: React.Dispatch<React.SetStateAction<number>>;
  openFilter: () => void;
  handleFilter: () => void;
  handleRefresh: () => void;
  closeFilter: () => void;
  clearData: () => void;
  handleTask: (callback: () => void) => void;
};

export const FilterWithdrawGameContext = createContext<TFilterRequestContext>({
  opened: false,
  active: 1,
  activeStatus: 1,
  isFilter: false,
  refresh: false,
  filterAgain: false,
  filter: {
    request_id: '',
    requester_phone: '',
    status: 1,
    start: getDateAfter(new Date(), 0, -1),
    end: new Date(),
  },
  setActive: () => {},
  setActiveStatus: () => {},
  setFilter: () => {},
  setRefresh: () => {},
  setIsFilter: () => {},
  openFilter: () => {},
  handleFilter: () => {},
  handleRefresh: () => {},
  closeFilter: () => {},
  clearData: () => {},
  handleTask: () => {},
});

const FilterWithdrawGameProvider = ({ children }: FilterRequestProviderProps) => {
  const [opened, setOpened] = useState(false);
  const [filter, setFilter] = useState({
    start: getDateAfter(new Date(new Date().setHours(0, 0, 0, 0)), 1, -1),
    end: new Date(new Date().setHours(23, 59, 59, 999)),
    request_id: '',
    requester_phone: '',
    status: 0,
  });
  const [isFilter, setIsFilter] = useState(false);
  const [filterAgain, setFilterAgain] = useState(false);
  const [active, setActive] = useState(1);
  const [activeStatus, setActiveStatus] = useState(4);
  const [refresh, setRefresh] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const openFilter = () => {
    setOpened(true);
  };

  const closeFilter = () => {
    setOpened(false);
    const item = statusBox.find((item, _) => item.value === filter.status);
    if (item) setActiveStatus(item?.id);
  };

  const handleFilter = () => {
    // setSearchParams({
    //   start: JSON.stringify(filter.start.getTime()),
    //   end: JSON.stringify(filter.end.getTime()),
    // });

    const item = statusBox.find((item, _) => item.id === activeStatus);
    if (item)
      setFilter({
        ...filter,
        status: item.value,
      });
    setIsFilter(true);
    setFilterAgain(!filterAgain);
    setOpened(false);
  };

  function handleRefresh() {
    closeFilter();
    setIsFilter(false);
    setRefresh(true);
    setActive(1);
    setActiveStatus(4);
    setFilter({
      status: 0,
      request_id: '',
      requester_phone: '',
      start: getDateAfter(new Date(new Date().setHours(0, 0, 0, 0)), 1, -1),
      end: new Date(new Date().setHours(23, 59, 59, 999)),
    });
    // setSearchParams({});
  }

  function clearData() {
    setIsFilter(false);
    setActive(1);
    setActiveStatus(4);

    setFilter({
      status: 0,
      request_id: '',
      requester_phone: '',
      start: getDateAfter(new Date(new Date().setHours(0, 0, 0, 0)), 1, -1),
      end: new Date(new Date().setHours(23, 59, 59, 999)),
    });
  }

  function handleTask(callback: () => void) {
    callback();
  }

  return (
    <FilterWithdrawGameContext.Provider
      value={{
        opened,
        refresh,
        filterAgain,
        filter,
        active,
        activeStatus,
        isFilter,
        setRefresh,
        setActive,
        setActiveStatus,
        setIsFilter,
        setFilter,
        openFilter,
        handleFilter,
        handleRefresh,
        closeFilter,
        clearData,
        handleTask,
      }}
    >
      {children}
    </FilterWithdrawGameContext.Provider>
  );
};

export const useFilterWithdrawGameRequest = () => useContext(FilterWithdrawGameContext);
export default FilterWithdrawGameProvider;
