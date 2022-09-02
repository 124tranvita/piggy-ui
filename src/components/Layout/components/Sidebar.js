import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import images from '../../../assets/images';

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: 'Dashboard', src: `${images.dashboard}`, path: '/' },
    { title: 'Profile', src: `${images.profile}`, path: '/profile' },
    {
      title: 'Catalogues',
      src: `${images.catalogue}`,
      path: '/catalogues',
      gap: true,
    },
    { title: 'Incomes', src: `${images.income}`, path: '/incomes' },
    { title: 'Spendings', src: `${images.spending}`, path: '/spendings' },
    { title: 'Reports', src: `${images.report}`, path: '/reports', gap: true },
  ];

  return (
    <div
      className={`${
        open ? 'w-64' : 'w-20'
      } duration-300 h-screen p-5 pt-4 relative border-r-1 bg-white z-10`}
    >
      <img
        src={images.control}
        alt="control"
        className={`absolute cursor-pointer rounded-full -right-3 top-20 w-7 ${
          !open && 'rotate-180'
        }`}
        onClick={() => setOpen(!open)}
      />

      <div className="flex gap-x-4 items-center border-b-1 pb-2">
        <img
          src={images.logo}
          alt="logo"
          className={` cursor-pointer duration-500 w-8 h-8`}
        />
        <h1
          className={`text-gray-800 origin-left font-bold text-xl duration-300 ${
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
            style={({ isActive }) => ({
              backgroundColor: isActive ? '#EAEAEA' : '',
            })}
            className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-200 rounded-md ${
              menu.gap ? 'mt-9' : 'mt-2'
            }`}
          >
            <img src={menu.src} alt={menu.title} className="w-8" />
            <span
              className={`${
                !open && 'scale-0'
              } origin-left duration-300 text-gray-600 font-bold`}
            >
              {menu.title}
            </span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
