import { useState, useEffect, useMemo } from 'react';
import dateFormat from 'dateformat';
import { Menu } from '@headlessui/react';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';

import EditMenu from '../components/EditMenu';
import Loader from '../components/Loader';
import SelectBox from '../components/SelectBox';
import Banner from '../components/Banner';
import { IncomeForm } from '../components/DialogForm';
import { UpdateModalForm, ConfirmModal } from '../components/ModalForm';
import { TableAdvanced } from '../components/Table';

import { useAuthContext } from '../hooks/useAuthContext';
import { useFilterContext } from '../hooks/useFilterContext';
import { useIsLoadingContext } from '../hooks/useIsLoadingContext';

import { getData } from '../utils/fetchData';
import numberFormat from '../utils/numberFormat';

export default function Income() {
  const { user } = useAuthContext();
  const { filterIncome } = useFilterContext();
  const { isLoading, dispatch } = useIsLoadingContext();

  const [data, setData] = useState([]);

  // For update/delete modal
  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [rowData, setRowData] = useState({});

  const handleOpenUpdateModal = (row) => {
    setRowData(row);
    setOpenModal(true);
  };

  const handleOpenDeleteModal = (row) => {
    setRowData(row);
    setOpenConfirm(true);
  };

  const updateDataAfterPOST = (result) => {
    setData(data.concat(result));
  };

  const updateDataAfterPATCH = (result) => {
    const updatedData = data.map((el) => {
      if (el.id === result.id) el = result;
      return el;
    });
    setData(updatedData);
  };

  const updateDataAfterDELETE = (id) => {
    const updatedData = data.filter((el) => el.id !== id);
    setData(updatedData);
  };

  useEffect(() => {
    dispatch({ type: 'SET_TRUE' });
    getData(
      `incomes/from/${filterIncome.from}/to/${filterIncome.to}`,
      user.token
    ).then((result) => {
      setData(result.data.data);
      dispatch({ type: 'SET_FALSE' });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterIncome.from, filterIncome.to, user.token]);

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
        sortType: 'basic',
      },
      {
        Header: 'Date',
        accessor: 'createAt',
        sortType: 'basic',
        Cell: (props) => <div>{dateFormat(props.value, 'yyyy-mm-dd')}</div>,
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        sortType: 'basic',
        Cell: (props) => (
          <div>
            {numberFormat({ locale: 'vi-VN', currency: 'VND' }).format(
              props.value
            )}
          </div>
        ),
      },
      {
        Header: 'EDIT',
        Cell: ({ row }) => (
          <div>
            <EditMenu className="relative inline-flex">
              <Menu.Item>
                <button
                  className="font-medium text-sm text-gray-500 hover:text-gray-600 flex py-1 px-3 w-full"
                  onClick={() => handleOpenUpdateModal(row.original)}
                >
                  Update
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3 w-full"
                  onClick={() => handleOpenDeleteModal(row.original)}
                >
                  Delete
                </button>
              </Menu.Item>
            </EditMenu>
          </div>
        ),
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div className="font-semibold">
      <Banner title={'Incomes'} description={'Manage all your incomes.'} />
      <div className="flex w-36 justify-between">
        <IncomeForm
          icon={<AiOutlineAppstoreAdd />}
          title={'Add'}
          fn={updateDataAfterPOST}
          className="btn p-2 bg-emerald-500 hover:bg-emerald-600 text-white flex items-center rounded-md"
        />
        <SelectBox className=" bg-emerald-500 hover:bg-emerald-600 flex items-center rounded-md" />
      </div>

      <TableAdvanced columns={columns} data={data} />

      {openModal && (
        <UpdateModalForm
          isOpen={openModal}
          setIsOpen={setOpenModal}
          data={rowData}
          fn={updateDataAfterPATCH}
        />
      )}

      {openConfirm && (
        <ConfirmModal
          isOpen={openConfirm}
          setIsOpen={setOpenConfirm}
          id={rowData.id}
          fn={updateDataAfterDELETE}
        />
      )}
    </div>
  );
}
