import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import images from '../../assets/images';
import { GoDashboard } from 'react-icons/go';
import { CgProfile, CgList } from 'react-icons/cg';
import { TbTableImport, TbTableExport, TbReport } from 'react-icons/tb';
import { BsArrowLeftCircleFill } from 'react-icons/bs';

export default function Sidebar() {
  const theme = localStorage.getItem('theme');

  const [open, setOpen] = useState(true);
  const Menus = [
    { title: 'Dashboard', icon: <GoDashboard />, path: '/dashboard' },
    { title: 'Profile', icon: <CgProfile />, path: '/profile' },
    {
      title: 'Catalogues',
      icon: <CgList />,
      path: '/catalogues',
      gap: true,
    },
    { title: 'Incomes', icon: <TbTableImport />, path: '/incomes' },
    { title: 'Spendings', icon: <TbTableExport />, path: '/spendings' },
    { title: 'Reports', icon: <TbReport />, path: '/reports', gap: true },
  ];

  return (
    <div
      className={`${
        open ? 'w-20 md:w-64 ' : 'w-20 -ml-20 md:ml-0'
      } duration-300 h-screen p-5 pt-5 relative bg-white dark:bg-slate-900 z-20 border-r-1 dark:border-slate-800`}
    >
      {/* <img
        src={images.control}
        alt="control"
        className={`absolute cursor-pointer rounded-full -right-3 top-11 w-7 ${
          !open && 'rotate-180'
        }`}
        onClick={() => setOpen(!open)}
      /> */}
      <div
        className={`absolute cursor-pointer rounded-full -right-3 text-2xl text-blue-500 dark:text-slate-500 ${
          !open && 'rotate-180'
        }`}
        onClick={() => setOpen(!open)}
      >
        <BsArrowLeftCircleFill />
      </div>

      <div
        className={`flex gap-x-4 ${
          open ? 'justify-center' : ''
        } items-center  pb-2 duration-300 border-b-1 dark:border-slate-500`}
      >
        <img
          src={images.logo}
          alt="logo"
          className={` cursor-pointer duration-500 w-8 h-8`}
        />
        <h1
          className={`text-indigo-500 origin-left font-bold text-xl duration-300 hidden md:block ${
            !open && 'scale-0'
          }`}
        >
          PiGGY
        </h1>
      </div>

      <ul className="pt-1">
        {Menus.map((menu, index) => (
          <NavLink
            to={menu.path}
            key={index}
            style={({ isActive }) =>
              theme === 'dark'
                ? {
                    color: '#cbd5e1',
                    opacity: isActive ? 1 : 0.7,
                    backgroundColor: isActive ? '#334155' : '',
                  }
                : {
                    color: '#4f46e5',
                    opacity: isActive ? 1 : 0.7,
                    backgroundColor: isActive ? '#e2e8f0' : '',
                  }
            }
            className={` text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-md ${
              menu.gap ? 'mt-9' : 'mt-2'
            }`}
          >
            {/* <img src={menu.src} alt={menu.title} className="w-8" /> */}
            <span className="text-2xl">{menu.icon}</span>
            <span
              className={`${
                !open && 'scale-0'
              } origin-left duration-300 hidden font-semibold md:block`}
            >
              {menu.title}
            </span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
