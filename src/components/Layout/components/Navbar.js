import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import NavItem from './NavItem';
import images from '../../../assets/images';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div>
      <nav className="flex flex-wrap items-center justify-between px-2 py-3 bg-emerald-500 mb-3 fixed top-0 left-0 w-screen">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-items-start">
            <a href="#home" className="flex items-center">
              <img
                src={images.logo}
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white uppercase">
                MMO
              </span>
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FaBars />
            </button>
          </div>
          <div
            className={`lg:flex flex-grow items-center ${
              navbarOpen ? 'flex' : 'hidden'
            }`}
            id="navbar"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex px-2 items-center">
                <NavItem />
              </li>
              <li className="flex pl-2 items-center">
                <NavItem isUser={true} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
