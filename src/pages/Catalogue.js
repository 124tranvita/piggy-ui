import { useState, useMemo, useEffect } from 'react';
import dateFormat from 'dateformat';
import * as Yup from 'yup';
import { Menu } from '@headlessui/react';
import { MdOutlineList } from 'react-icons/md';

import { useAuthContext } from '../hooks/useAuthContext';
import { useNotificationContext } from '../hooks/useNotificationContext';

import EditMenu from '../components/EditMenu';
import { Loader } from '../components/Loader';
import { TableAdvanced } from '../components/Table';
import { AddDialogForm } from '../components/DialogForm';
import { UpdateModalForm, ConfirmModal } from '../components/ModalForm';

import { getData } from '../utils/fetchData';
import { MyTextInput } from '../utils/FormikField';
import { PageTransition } from '../utils/Transition';
import {
  updateDataAfterPOST,
  updateDataAfterPATCH,
  updateDataAfterDELETE,
} from '../utils/updateDataAfterFetch';

/**Formik initial settings for adding catalogue item*/
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
  /**Get contexts states */
  const { user } = useAuthContext();
  const { isLoading, dispatch } = useNotificationContext();

  /**State to set data from API response */
  const [data, setData] = useState([]);

  /**Sort the data array by createAt value */
  data.sort((a, b) => Date.parse(a.createAt) - Date.parse(b.createAt));

  /** rack openUpdateModal and openDeleteConfirmModal */
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

  /**Get catalogues data from server */
  useEffect(() => {
    getData(`catalogues`, user.token, dispatch).then((result) => {
      setData(result.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token]);

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
                path={'catalogues'}
                fn={(result) => updateDataAfterPOST(result, setData, data)}
                initialValues={initialValues}
                validationSchema={validationSchema}
                className="bg-white text-slate-500 hover:text-slate-600 flex items-center"
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
            <TableAdvanced
              columns={columns}
              data={data}
              title={'Catalogues'}
              icon={<MdOutlineList />}
              iconTextColor={'text-orange-500'}
            />

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
    </div>
  );
}
