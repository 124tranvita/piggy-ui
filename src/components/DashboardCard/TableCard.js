import dateFormat from 'dateformat';
import numberFormat from '../../utils/numberFormat';

export default function TableCard({ title, data, icon, textColor }) {
  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="flex items-center px-5 py-4 border-b border-slate-100">
        <h2>{title}</h2>
        <div className="text-xs font-semibold text-slate-400  px-2">
          (latest 5 records)
        </div>
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
              {data.map((el) => (
                <tr key={el.id}>
                  <td className="p-2">
                    <div className="flex items-center">
                      <img
                        className="shrink-0 mr-2"
                        src={icon}
                        alt="logo"
                        width="36"
                        height="36"
                      />
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
                      {numberFormat({
                        locale: 'en-US',
                        currency: 'USD',
                      }).format(el.amount)}
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
