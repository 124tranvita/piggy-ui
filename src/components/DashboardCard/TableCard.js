import dateFormat from 'dateformat';
import numberFormat from '../../utils/numberFormat';
import { TbTableImport, TbTableExport } from 'react-icons/tb';
import { MdOutlineImportExport } from 'react-icons/md';

export default function TableCard({ title, data, textColor }) {
  return (
    <div className="col-span-full xl:col-span-6 bg-white">
      <header className="flex items-center px-5 py-4 border-b border-slate-200">
        <div
          className={`text-4xl mr-3 ${
            title.toLowerCase() === 'incomes'
              ? 'text-emerald-500'
              : 'text-rose-500'
          }`}
        >
          {title.toLowerCase() === 'incomes' ? (
            <TbTableImport />
          ) : (
            <TbTableExport />
          )}
        </div>
        <h2>{title}</h2>
        <div className="text-xs text-slate-400  px-2">(last 5 records)</div>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Source</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Amount</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {data &&
                data.slice(0, 5).map((el) => (
                  <tr key={el._id}>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div
                          className={`${
                            title.toLowerCase() === 'incomes'
                              ? 'text-emerald-500'
                              : 'text-red-500'
                          } mr-1 text-2xl`}
                        >
                          <MdOutlineImportExport />
                        </div>
                        <div className="text-slate-800">{el.name}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {dateFormat(el.createAt, 'yyyy-mm-dd')}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className={`text-center ${textColor}`}>
                        {el.amount === 0 || el.total === 0
                          ? numberFormat({
                              locale: 'vi-VN',
                              currency: 'VND',
                            }).format(0)
                          : numberFormat({
                              locale: 'vi-VN',
                              currency: 'VND',
                            }).format(el.amount ? el.amount : el.total)}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
