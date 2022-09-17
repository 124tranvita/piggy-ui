import { useState, useEffect, forwardRef, useRef } from 'react';
import {
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table';

import { useAuthContext } from '../hooks/useAuthContext';

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={'Search'}
        className="appearance-none border-b-1 border-slate-300 dark:border-slate-600 block pl-8 pr-6 py-2 w-full bg-slate-50 dark:bg-slate-800 text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
      />
    </span>
  );
}

// Table rows selection
const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

export const TableBasic = ({ columns, data }) => {
  // const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    // Apply the table props
    <table
      {...getTableProps()}
      className="w-full text-sm text-left text-gray-500 dark:text-gray-400 dark:bg-slate-800"
    >
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th
                    {...column.getHeaderProps}
                    className="py-3 px-6"
                    scope="col"
                  >
                    {
                      // Render the header
                      column.render('Header')
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr
                {...row.getRowProps()}
                className="bg-white border-b dark:bg-slate-800 dark:border-gray-800"
              >
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()} className="py-4 px-6">
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

export const TablePagination = ({ columns, catalogueId }) => {
  const { user } = useAuthContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://192.168.1.236:4000/api/v1/spendings/catalogue/${catalogueId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    };

    fetchData().then((data) => setData(data.data));
  }, [catalogueId, user.token]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page which has only the rows for the active page

    // The rest of these things are super handy, too :)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    usePagination
  );

  // Render the UI for your table
  return (
    <div className="overflow-x-auto">
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre> */}
      <table
        {...getTableProps()}
        className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th
                      {...column.getHeaderProps}
                      className="py-3 px-6"
                      scope="col"
                    >
                      {
                        // Render the header
                        column.render('Header')
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            page.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr
                  {...row.getRowProps()}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-800"
                >
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()} className="py-4 px-6">
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="bg-gray-50 sm:flex-col p-1">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className=""
        >
          {'<<'}
        </button>{' '}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className=""
        >
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage} className="">
          {'>'}
        </button>{' '}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className=""
        >
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '50px' }}
            className="border-2 rounded-md"
          />
        </span>{' '}
        <select
          className="border-2 rounded-md"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const TableAdvanced = ({
  columns,
  data,
  title,
  icon,
  iconTextColor,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page which has only the rows for the active page
    state,

    // The rest of these things are super handy, too :)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },

    // visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        hiddenColumns: ['id'],
        sortBy: [{ columnId: 'createAt', desc: true }],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps methid to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The header can use the table's getToggleRowSelectedProps methid to render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  // Render the UI for your table
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map(
                (d) => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre> */}

      {/* Header of the table */}
      <header className="flex items-center py-4 border-b border-slate-300 dark:border-slate-600">
        <div className="flex items-center text-slate-800 dark:text-slate-200">
          <div className={`text-4xl mr-3 ${iconTextColor}`}>{icon}</div>
          <h2 className="font-semibold">{title.toUpperCase()}</h2>
        </div>
        <div className="text-xs text-slate-400 px-1 md:px-2">
          (Last 30 days)
        </div>
      </header>

      {/* Page select and filter of table */}
      <div className="my-2 flex sm:flxe-row flex-col">
        <div className="flex justify-end flex-row mb-1 sm:mb-0">
          {/* Global filtering */}
          <div className="block relative">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current text-gray-400"
              >
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
              </svg>
            </span>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>

          {/* Select showing page */}
          <div className="relative mr-3">
            <select
              className=" appearance-none h-full border-b-1 border-slate-300 dark:border-slate-600 block w-full bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-slate-100"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Main of table */}
      <div className="inline-block min-w-full overflow-hidden py-2">
        {/* w-full text-sm text-left text-gray-500 dark:text-gray-400 */}
        <table {...getTableProps()} className="table-auto w-full">
          <thead className="text-xs uppercase text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-900 rounded-sm">
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        scope="col"
                        className="font-semibold text-left p-2"
                      >
                        {
                          // Render the header
                          column.render('Header')
                        }
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' < '
                              : ' > '
                            : ''}
                        </span>
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody
            {...getTableBodyProps()}
            className="text-sm font-medium divide-y divide-slate-200 dark:divide-slate-600"
          >
            {
              // Loop over the table rows
              page.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr
                    {...row.getRowProps()}
                    className="bg-slate-50 dark:bg-slate-800  hover:bg-slate-50 dark:text-slate-200"
                  >
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="p-2 text-sm font-normal"
                          >
                            {
                              // Render the cell contents
                              cell.render('Cell')
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>

        <div className="px-5 py-5 bg-slate-50 dark:bg-slate-800 flex flex-col xs:flex-row items-center xs:justify-between">
          {!data[0] && (
            <div className="text-sm mb-3 text-slate-800 dark:text-slate-200">
              No record was found!
            </div>
          )}
          <span className="text-xs xs:text-sm text-slate-800 dark:text-slate-200">
            Showing{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
            entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0 text-slate-800 dark:text-slate-200">
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="text-sm border-b-1 border-slate-300 dark:border-slate-600 mx-2 cursor-pointer hover:text-gray-400 font-semibold py-2 px-4"
            >
              {'<<'}
            </button>{' '}
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="text-sm border-b-1 border-slate-300 dark:border-slate-600 mx-2 cursor-pointer hover:text-gray-400  font-semibold py-2 px-4"
            >
              {'Prev'}
            </button>{' '}
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="text-sm border-b-1 border-slate-300 dark:border-slate-600 mx-2 cursor-pointer hover:text-gray-400 font-semibold py-2 px-4"
            >
              {'Next'}
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="text-sm border-b-1 border-slate-300 dark:border-slate-600 mx-2 cursor-pointer hover:text-gray-400 font-semibold py-2 px-4"
            >
              {'>>'}
            </button>
          </div>
        </div>
        {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
        {/* <div className="bg-gray-50 sm:flex-col p-1">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className={buttonGoToClassName}
          >
            {'<<'}
          </button>{' '}
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={buttonNextClassName}
          >
            {'<'}
          </button>{' '}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={buttonNextClassName}
          >
            {'>'}
          </button>{' '}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className={buttonGoToClassName}
          >
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: '50px' }}
              className="border-2 rounded-md"
            />
          </span>{' '}
          <select
            className="border-2 rounded-md"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div> */}
      </div>
    </div>
  );
};
