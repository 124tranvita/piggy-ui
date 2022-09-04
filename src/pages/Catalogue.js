import { useState, useMemo, useEffect } from 'react';
import dateFormat from 'dateformat';
import { TablePagination } from '../components/Tables';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { useAuthContext } from '../hooks/useAuthContext';

import CATALOGUES from '../assets/dev-data/catalogues.json';

export default function Catalogue() {
  const [data, setData] = useState([]);

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'http://192.168.1.236:4000/api/v1/catalogues',
        { method: 'GET' }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    };

    fetchData().then((data) => setData(data));
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'userId',
      },
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Body',
        accessor: 'body',
      },
    ],
    []
  );

  return (
    <div className="text-2xl font-semibold">
      <h1>Catalogue</h1>
      <div className="w-full px-7 pt-16">
        {CATALOGUES.data.data.map((el) => (
          <div className="mx-auto w-full mb-3" key={el.id}>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between bg-white px-4 py-2 text-left text-base text-slate-500 font-semibold shadow-lg  hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                    <span className="w-1/3">{el.name.toUpperCase()}</span>
                    <span>{dateFormat(el.createAt, 'yyyy-mm-dd')}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="pb-2 text-sm text-gray-500">
                    <TablePagination columns={columns} />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  );
}
