import { useState, useMemo, useEffect } from 'react';
import dateFormat from 'dateformat';
import { ChevronUpIcon } from '@heroicons/react/solid';
import {
  AiOutlineAppstoreAdd,
  AiOutlineEdit,
  AiOutlineDelete,
} from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';

import { useAuthContext } from '../hooks/useAuthContext';
import { useNotificationContext } from '../hooks/useNotificationContext';

import { TablePagination } from '../components/Tables';
import Loader from '../components/Loader';
import CatalogueForm from '../components/Form/CatalogueForm';
import Banner from '../components/Banner';

import numberFormat from '../utils/numberFormat';

import { getData, postData, deleteData, patchData } from '../utils/fetchData';

export default function Catalogue() {
  const { user } = useAuthContext();
  const { dispatch } = useNotificationContext();
  // const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  // console.log('Catalogues Data: ', data);

  const deleteItem = (path, id) => {
    deleteData(path, user.token, id, dispatch).then((result) => {
      getData('catalogues', user.token).then((data) => setData(data.data.data));
    });
  };

  const updateItem = (path, value) => {
    patchData(path, user.token, value, dispatch).then((result) => {
      getData('catalogues', user.token).then((data) => setData(data.data.data));
    });
  };

  const addItem = (path, value) => {
    postData(path, user.token, value, dispatch).then((result) => {
      setData(data.concat(result.data));
    });
  };

  useEffect(() => {
    if (user) {
      getData('catalogues', user.token).then((data) => setData(data.data.data));
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Date',
        accessor: 'createAt',
        Cell: (props) => <div>{dateFormat(props.value, 'yyyy-mm-dd')}</div>,
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: (props) => (
          <div>
            {numberFormat({ locale: 'vi-VN', currency: 'VND' }).format(
              props.value
            )}
          </div>
        ),
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        Header: 'Total',
        accessor: 'total',
        Cell: (props) => (
          <div>
            {numberFormat({ locale: 'vi-VN', currency: 'VND' }).format(
              props.value
            )}
          </div>
        ),
      },
    ],
    []
  );

  if (data.length === 0) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="font-semibold">
      <Banner />
      <div className="w-full px-2 pt-1">
        {/* Controll button */}
        <div className="sm:flex sm:justify-end sm:items-center mb-8">
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            {/* Catalogue modal form */}
            <CatalogueForm
              icon={<AiOutlineAppstoreAdd />}
              title={'Add item'}
              fn={addItem}
              className="btn bg-emerald-500 hover:bg-emerald-600 text-white flex items-center px-2 rounded-md"
            />
          </div>
        </div>
        {/* Controll button */}

        {/* Catalogue item list */}
        <div className="flex flex-wrap md:flex-nowrap mx-auto w-full mb-3">
          <div className="flex w-full justify-between px-4 py-2 text-left text-base font-semibold shadow-lg bg-gray-500 text-white">
            <span className="w-1/3">Name</span>
            <span>Create Date</span>
            <button
              className={`${openEdit ? 'text-red-500' : ''} duration-200`}
              onClick={() => setOpenEdit(!openEdit)}
            >
              {openEdit ? <MdOutlineCancel /> : <AiOutlineEdit />}
            </button>
          </div>
        </div>
        {data.map((el) => (
          <div
            className="flex flex-wrap md:flex-nowrap mx-auto w-full mb-3"
            key={el.id}
          >
            <div className="w-full">
              <DisclosureWithTable columns={columns} catalogue={el} />
            </div>
            {/* Edit/Delete button */}
            <div
              className={`${
                !openEdit ? 'hidden' : ''
              } flex justify-between items-center duration-300 mt-1 md:mt-0`}
            >
              {/* Edit button */}
              <CatalogueForm
                icon={<AiOutlineEdit />}
                fn={updateItem}
                itemName={el.name}
                itemId={el.id}
                className="btn mx-1 bg-sky-500 hover:bg-sky-600 text-white flex items-center py-1 px-2 rounded-md"
              />
              {/* Delete button */}
              <button
                className="btn bg-red-500 hover:bg-red-600 text-white flex items-center px-2 rounded-md"
                onClick={() => deleteItem('catalogues', el.id)}
              >
                <span className="py-1">
                  <AiOutlineDelete />
                </span>
              </button>
            </div>
            {/* Edit/Delete button */}
          </div>
        ))}
      </div>
    </div>
  );
}

function DisclosureWithTable({ columns, catalogue }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="flex w-full justify-between bg-white px-4 py-2 text-left text-base text-slate-500 font-semibold shadow-lg  hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75"
        onClick={() => setOpen(!open)}
      >
        <span className="w-1/3">{catalogue.name.toUpperCase()}</span>
        <span>{dateFormat(catalogue.createAt, 'yyyy-mm-dd')}</span>
        <ChevronUpIcon
          className={`${
            open ? 'rotate-180 transform' : ''
          }h-5 w-5 text-green-500`}
        />
      </button>
      <div
        className={`${
          !open ? 'hidden' : ''
        } pb-2 text-sm text-gray-500 duration-200`}
      >
        <TablePagination columns={columns} catalogueId={catalogue.id} />
      </div>
    </>
  );
}
