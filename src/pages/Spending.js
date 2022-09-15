import { useState, useEffect, useMemo } from 'react';
import { Menu } from '@headlessui/react';
import dateFormat from 'dateformat';
import * as Yup from 'yup';
import { MdOutlineTrendingDown } from 'react-icons/md';

import EditMenu from '../components/EditMenu';
import SelectBox from '../components/SelectBox';
import { Loader } from '../components/Loader';
import { TableAdvanced } from '../components/Table';
import { AddDialogForm } from '../components/DialogForm';
import { UpdateModalForm, ConfirmModal } from '../components/ModalForm';

import { useAuthContext } from '../hooks/useAuthContext';
import { useNotificationContext } from '../hooks/useNotificationContext';
import { useFilterContext } from '../hooks/useFilterContext';

import numberFormat from '../utils/numberFormat';
import { MyTextInput, MySelect } from '../utils/FormikField';
import { PageTransition } from '../utils/Transition';
import { getData } from '../utils/fetchData';
import {
  updateDataAfterPOST,
  updateDataAfterPATCH,
  updateDataAfterDELETE,
} from '../utils/updateDataAfterFetch';

/**Formik initial settings for adding spending item */
const initialValues = {
  name: '',
  createAt: dateFormat(new Date(), 'yyyy-mm-dd'),
  description: '',
  price: 0,
  quantity: 1,
  catalogue: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be greater or equal to 2 characters')
    .max(32, 'Name mus be lesser or equal to 32 characters.')
    .required('Required'),
  createAt: Yup.date()
    .max(new Date(), 'Create date must lesser or equal to current day.')
    .required('Required'),
  catalogue: Yup.string().required('Required'),
});

export default function Spending() {
  /**Get contexts states */
  const { user } = useAuthContext();
  const { isLoading, dispatch } = useNotificationContext();
  const { filterSpending } = useFilterContext();

  /**State to set data from API response */
  const [spendingData, setSpendingData] = useState([]);
  const [catalogueData, setCatalogueData] = useState([]);

  /**State to check if user already have an item in catalogues or not */
  const [isNoCatalogue, setIsNoCatalogue] = useState(false);

  /**Sort the data array by createAt value */
  spendingData.sort((a, b) => Date.parse(a.createAt) - Date.parse(b.createAt));

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

  /** Get spendings data from server */
  useEffect(() => {
    const fetchData = async () => {
      /** Chanining the request to both of Catalogues and Spendings
       * Catalogues list is need when add spending
       */
      const [catalogues, spendings] = await Promise.all([
        getData(`catalogues`, user.token, dispatch),
        getData(
          `spendings/from/${filterSpending.from}/to/${filterSpending.to}`,
          user.token,
          dispatch
        ),
      ]);

      /**Check user's catalogue's item */
      if (catalogues.result === 0) setIsNoCatalogue(true);

      setSpendingData(spendings.data.data);
      setCatalogueData(catalogues.data.data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSpending.from, filterSpending.to]);

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
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Catalogue',
        accessor: 'catalogue.name',
      },
      {
        Header: 'Date',
        accessor: 'createAt',
        sortType: 'basic',
        Cell: (props) => <div>{dateFormat(props.value, 'yyyy-mm-dd')}</div>,
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
        sortType: 'basic',
      },
      {
        Header: 'Price',
        accessor: 'price',
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
        Header: 'Total',
        accessor: 'total',
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
    <div className="relative">
      <PageTransition>
        {spendingData[0] && (
          <>
            {/* Catalogue's item warning */}
            <div
              className={`flex justify-center ${
                isNoCatalogue ? 'block' : 'hidden'
              } duration-300`}
            >
              <h2 className="rounded-md px-2 text-sm text-white bg-rose-500">
                You must have at least one catalogue item to continue.
              </h2>
            </div>

            {/* Main div */}
            <div className="flex justify-end absolute right-0 top-10">
              {/* Add item button */}
              <AddDialogForm
                path={'spendings'}
                fn={(result) =>
                  updateDataAfterPOST(result, setSpendingData, spendingData)
                }
                initialValues={initialValues}
                validationSchema={validationSchema}
                className="bg-white text-slate-500 hover:text-slate-600 flex items-center"
                disabled={isNoCatalogue}
              >
                <MyTextInput
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Coca, Bill, Payment..."
                />
                <MySelect label="Catalogues" name="catalogue">
                  <option value="">Catalogues</option>
                  {catalogueData.map((el) => (
                    <option value={el.id} key={el.id}>
                      {el.name}
                    </option>
                  ))}
                </MySelect>
                <MyTextInput
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Description..."
                />
                <MyTextInput label="Date" name="createAt" type="date" />
                <MyTextInput label="Price" name="price" type="number" />
                <MyTextInput label="Quantity" name="quantity" type="number" />
              </AddDialogForm>

              {/* Period time SelectBox */}
              <SelectBox
                filter={filterSpending}
                actionType={'SET_SPENDING'}
                className=" bg-white text-slate-500 hover:text-slate-600 flex items-center mx-4"
              />
            </div>

            {/* Table area */}
            <TableAdvanced
              columns={columns}
              data={spendingData}
              title={'Spendings'}
              icon={<MdOutlineTrendingDown />}
              iconTextColor={'text-rose-500'}
            />

            {/* Edit and Remove Modal */}
            <div className={`${!openModal ? 'hidden' : 'block'} duration-200`}>
              <UpdateModalForm
                isOpen={openModal}
                setIsOpen={setOpenModal}
                initialValues={initialValues}
                validationSchema={validationSchema}
                path={'spendings'}
                data={rowData}
                fn={(result) =>
                  updateDataAfterPATCH(result, setSpendingData, spendingData)
                }
              >
                <MyTextInput
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Coca, Bill, Payment..."
                />
                <MySelect label="Catalogues" name="catalogue">
                  <option value="">Catalogues</option>
                  {catalogueData.map((el) => (
                    <option value={el.id} key={el.id}>
                      {el.name}
                    </option>
                  ))}
                </MySelect>
                <MyTextInput
                  label="Description"
                  name="description"
                  type="text"
                />
                <MyTextInput label="Date" name="createAt" type="date" />
                <MyTextInput label="Price" name="price" type="number" />
                <MyTextInput label="Quantity" name="quantity" type="number" />
              </UpdateModalForm>
            </div>

            <div
              className={`${!openConfirm ? 'hidden' : 'block'} duration-200`}
            >
              <ConfirmModal
                isOpen={openConfirm}
                setIsOpen={setOpenConfirm}
                path={'spendings'}
                id={rowData._id}
                fn={() =>
                  updateDataAfterDELETE(
                    rowData._id,
                    setSpendingData,
                    spendingData
                  )
                }
              />
            </div>
          </>
        )}
      </PageTransition>
    </div>
  );
}
