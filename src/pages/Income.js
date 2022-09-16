import { useState, useEffect, useMemo } from 'react';
import dateFormat from 'dateformat';
import * as Yup from 'yup';
import { Menu } from '@headlessui/react';
import { MdOutlineTrendingUp } from 'react-icons/md';

import EditMenu from '../components/EditMenu';
import SelectBox from '../components/SelectBox';
import { Loader } from '../components/Loader';
import { AddDialogForm } from '../components/DialogForm';
import { UpdateModalForm, ConfirmModal } from '../components/ModalForm';
import { TableAdvanced } from '../components/Table';

import { useAuthContext } from '../hooks/useAuthContext';
import { useFilterContext } from '../hooks/useFilterContext';
import { useNotificationContext } from '../hooks/useNotificationContext';

import { getData } from '../utils/fetchData';
import numberFormat from '../utils/numberFormat';
import { MyTextInput } from '../utils/FormikField';
import { PageTransition } from '../utils/Transition';
import {
  updateDataAfterPOST,
  updateDataAfterPATCH,
  updateDataAfterDELETE,
} from '../utils/updateDataAfterFetch';

/**Formik initial settings for adding income item */
const initialValues = {
  name: '',
  createAt: dateFormat(new Date(), 'yyyy-mm-dd'),
  amount: 0,
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be greater or equal to 2 characters')
    .max(16, 'Name mus be lesser or equal to 16 characters.')
    .required('Required'),
  createAt: Yup.date()
    .max(new Date(), 'Create date must lesser or equal to current day.')
    .required('Required'),
});

export default function Income() {
  /**Get contexts states */
  const { user } = useAuthContext();
  const { filterIncome } = useFilterContext();
  const { isLoading, dispatch } = useNotificationContext();

  /**State to set data from API response */
  const [data, setData] = useState([]);

  /**Sort the data array by createAt value */
  data.sort((a, b) => Date.parse(a.createAt) - Date.parse(b.createAt));

  /**Track openUpdateModal and openDeleteConfirmModal */
  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  /**State to set the row data when click on table row */
  const [rowData, setRowData] = useState({});

  /**Handler function to open/close modal and set the row data */
  const handleOpenUpdateModal = (row) => {
    setRowData(row);
    setOpenModal(true);
  };

  const handleOpenDeleteModal = (row) => {
    setRowData(row);
    setOpenConfirm(true);
  };

  /** Get incomes data from server */
  useEffect(() => {
    getData(
      `incomes/from/${filterIncome.from}/to/${filterIncome.to}`,
      user.token,
      dispatch
    ).then((result) => setData(result.data.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterIncome.from, filterIncome.to, user.token]);

  /**Define the columns for react-table */
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
        Cell: (props) => <div>{numberFormat().format(props.value)}</div>,
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
    <div className="relative">
      <PageTransition>
        {data[0] && (
          <>
            <div className="flex justify-end absolute right-0 top-10">
              {/* Add item button */}
              <AddDialogForm
                path={'incomes'}
                fn={(result) => updateDataAfterPOST(result, setData, data)}
                initialValues={initialValues}
                validationSchema={validationSchema}
                className="bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-700 flex items-center"
              >
                <MyTextInput
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Salary, Save, Loan..."
                />
                <MyTextInput label="Date" name="createAt" type="date" />
                <MyTextInput label="Amount" name="amount" type="number" />
              </AddDialogForm>

              {/* Period time SelectBox */}
              <SelectBox
                filter={filterIncome}
                actionType={'SET_INCOME'}
                className="bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-700 flex items-center mx-4"
              />
            </div>

            {/* Table data */}
            <TableAdvanced
              columns={columns}
              data={data}
              title={'Incomes'}
              icon={<MdOutlineTrendingUp />}
              iconTextColor={'text-emerald-500'}
            />

            {/* Edit and Remove Modal */}
            <div className={`${!openModal ? 'hidden' : 'block'} duration-200`}>
              <UpdateModalForm
                isOpen={openModal}
                setIsOpen={setOpenModal}
                initialValues={initialValues}
                validationSchema={validationSchema}
                path={'incomes'}
                data={rowData}
                fn={(result) => updateDataAfterPATCH(result, setData, data)}
              >
                <MyTextInput
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Salary, Save, Loan..."
                />
                <MyTextInput label="Date" name="createAt" type="date" />
                <MyTextInput label="Amount" name="amount" type="number" />
              </UpdateModalForm>
            </div>

            <div
              className={`${!openConfirm ? 'hidden' : 'block'} duration-200`}
            >
              <ConfirmModal
                isOpen={openConfirm}
                setIsOpen={setOpenConfirm}
                path={'incomes'}
                id={rowData.id}
                fn={() => updateDataAfterDELETE(rowData.id, setData, data)}
              />
            </div>
          </>
        )}
      </PageTransition>
    </div>
  );
}
