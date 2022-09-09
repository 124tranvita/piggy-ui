import { useState, useMemo, useEffect } from 'react';
import dateFormat from 'dateformat';
import * as Yup from 'yup';
import { Menu } from '@headlessui/react';

import { useAuthContext } from '../hooks/useAuthContext';
import { useNotificationContext } from '../hooks/useNotificationContext';

import Loader from '../components/Loader';
import Banner from '../components/Banner';
import { TableAdvanced } from '../components/Table';
import { AddDialogForm } from '../components/DialogForm';
import { UpdateModalForm, ConfirmModal } from '../components/ModalForm';
import EditMenu from '../components/EditMenu';

import { getData } from '../utils/fetchData';
import { MyTextInput } from '../utils/FormikField';
import { PageTransition } from '../utils/Transition';
import {
  updateDataAfterPOST,
  updateDataAfterPATCH,
  updateDataAfterDELETE,
} from '../utils/updateDataAfterFetch';

/** Configure for Add item Formik */
const initialValues = {
  name: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be greater or equal to 2 characters')
    .max(16, 'Name mus be lesser or equal to 16 characters.')
    .required('Required'),
});

export default function Catalogue() {
  const { user } = useAuthContext();
  const { isLoading, dispatch } = useNotificationContext();

  const [data, setData] = useState([]);

  data.sort((a, b) => Date.parse(a.createAt) - Date.parse(b.createAt));

  console.log(data);

  /** Track openUpdateModal and openDeleteConfirmModal */
  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  /** Set the row data when click on table row */
  const [rowData, setRowData] = useState({});

  const handleOpenUpdateModal = (row) => {
    setRowData(row);
    setOpenModal(true);
  };

  const handleOpenDeleteModal = (row) => {
    setRowData(row);
    setOpenConfirm(true);
  };

  /** Get data from the DB when the component is first load */
  useEffect(() => {
    dispatch({ type: 'SET_ISLOADING', payload: true });
    getData(`catalogues`, user.token, dispatch)
      .then((result) => {
        setData(result.data.data);
        dispatch({ type: 'SET_ISLOADING', payload: false });
      })
      .catch((err) => {
        const data = {
          status: 'failed',
          timestamp: new Date().toISOString(),
          unread: true,
          message: err.message,
        };

        dispatch({ type: 'ADD', payload: data });
        dispatch({ type: 'SET_ISLOADING', payload: false });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token]);

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Date',
        accessor: 'createAt',
        Cell: (props) => <div>{dateFormat(props.value, 'yyyy-mm-dd')}</div>,
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

  return (
    <>
      <Banner
        title={'Catalogues'}
        description={'Manage your spending by catalogues.'}
      />

      <PageTransition>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex w-44 justify-between">
              {/* Add item button */}
              <AddDialogForm
                path={'catalogues'}
                fn={(result) => updateDataAfterPOST(result, setData, data)}
                initialValues={initialValues}
                validationSchema={validationSchema}
                className="btn p-2 bg-emerald-500 hover:bg-emerald-600 text-white flex items-center rounded-md"
              >
                <MyTextInput
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Salary, Save, Loan..."
                />
              </AddDialogForm>
            </div>

            {/* Table data */}
            <TableAdvanced columns={columns} data={data} />

            {/* Edit and Remove Modal */}
            <div className={`${!openModal ? 'hidden' : 'block'} duration-200`}>
              {/* Edit modal */}
              <UpdateModalForm
                isOpen={openModal}
                setIsOpen={setOpenModal}
                initialValues={initialValues}
                validationSchema={validationSchema}
                path={'catalogues'}
                data={rowData}
                fn={(result) => updateDataAfterPATCH(result, setData, data)}
              >
                <MyTextInput
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Salary, Save, Loan..."
                />
              </UpdateModalForm>
            </div>

            {/* Delete modal */}
            <div
              className={`${!openConfirm ? 'hidden' : 'block'} duration-200`}
            >
              <ConfirmModal
                isOpen={openConfirm}
                setIsOpen={setOpenConfirm}
                path={'catalogues'}
                id={rowData.id}
                fn={() => updateDataAfterDELETE(rowData.id, setData, data)}
              />
            </div>
          </>
        )}
      </PageTransition>
    </>
  );
}
