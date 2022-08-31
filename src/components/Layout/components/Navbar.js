import NavItem from './NavItem';
import images from '../../../assets/images';

export default function Navbar() {
  return (
    <div>
      <nav className="flex items-center justify-between px-2 py-3 bg-emerald-500 mb-3 fixed top-0 left-0 w-screen">
        <div className="flex justify-around w-full mx-4">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-items-start">
            <a href="#home" className="flex items-center">
              <img
                src={images.logo}
                className="mr-3 h-6 sm:h-9"
                alt="MMO Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white uppercase">
                MMO
              </span>
            </a>
          </div>
          <div className="flex flex-grow items-center">
            <ul className="flex flex-row list-none lg:ml-auto">
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
