import { useState, useEffect, useMemo } from 'react';
import dateFormat from 'dateformat';
import { Menu } from '@headlessui/react';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';

import EditMenu from '../components/EditMenu';
import Loader from '../components/Loader';
import { IncomeForm } from '../components/DialogForm';
import { UpdateModalForm, ConfirmModal } from '../components/ModalForm';
import Banner from '../components/Banner';
import { TableAdvanced } from '../components/Table';
import SelectBox from '../components/SelectBox';

import { useAuthContext } from '../hooks/useAuthContext';

import { getData } from '../utils/fetchData';
import numberFormat from '../utils/numberFormat';

const defaultPeriod = {
  period: 'Last 7 Days',
  from: dateFormat(
    new Date(new Date().setDate(new Date().getDate() - 7)),
    'yyyy-mm-dd'
  ),
  to: dateFormat(new Date(), 'yyyy-mm-dd'),
};

export default function Income() {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  // For update/delete modal
  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [rowData, setRowData] = useState({});

  // For load data by period time
  const [selected, setSelected] = useState(defaultPeriod);

  console.log('Income selected: ', selected);
  const handleGetSelectedData = (value) => {
    setSelected(value);
  };

  const handleDelete = (row) => {
    setRowData(row);
    setOpenConfirm(true);
  };

  const handleUpdate = (row) => {
    setRowData(row);
    setOpenModal(true);
  };

  const updateCurrentData = (result) => {
    setData(data.concat(result));
  };

  const updateData = (result) => {
    const updatedData = data.map((el) => {
      if (el.id === result.id) el = result;
      return el;
    });

    setData(updatedData);
  };

  const updateDataAfterDelete = (id) => {
    const updatedData = data.filter((el) => el.id !== id);
    setData(updatedData);
  };

  useEffect(() => {
    setIsLoading(true);
    if (selected.from && selected.to) {
      getData(
        `incomes/from/${selected.from}/to/${selected.to}`,
        user.token
      ).then((result) => {
        setData(result.data.data);
        setIsLoading(false);
      });
    }
  }, [selected.from, selected.to, user.token]);

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
                  onClick={() => handleUpdate(row.original)}
                >
                  Update
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3 w-full"
                  onClick={() => handleDelete(row.original)}
                >
                  Remove
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
          fn={updateCurrentData}
          className="btn p-2 bg-emerald-500 hover:bg-emerald-600 text-white flex items-center rounded-md"
        />
        <SelectBox
          fn={handleGetSelectedData}
          className=" bg-emerald-500 hover:bg-emerald-600 flex items-center rounded-md"
        />
        {/* <select className="btn p-2 bg-emerald-500 hover:bg-emerald-600 text-white flex items-center rounded-md">
          filter
        </select> */}
      </div>

      <TableAdvanced columns={columns} data={data} />

      {openModal && (
        <UpdateModalForm
          isOpen={openModal}
          setIsOpen={setOpenModal}
          data={rowData}
          fn={updateData}
        />
      )}

      {openConfirm && (
        <ConfirmModal
          isOpen={openConfirm}
          setIsOpen={setOpenConfirm}
          id={rowData.id}
          fn={updateDataAfterDelete}
        />
      )}
    </div>
  );
}
