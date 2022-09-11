import UserMenu from '../../components/UserMenu';
import Notification from '../../components/Notification';

export default function Navbar() {
  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-3 fixed z-10 top-0 right-0 w-screen bg-white">
        <div className="w-full flex justify-between lg:w-auto lg:static lg:block lg:justify-items-start">
          {/* <a href="#home" className="flex items-center">
            <img src={images.logo} className="mr-3 h-6 sm:h-9" alt="MMO Logo" />
            <span className="self-center text-xl font-bold whitespace-nowrap">
              PiGGY
            </span>
          </a> */}
        </div>
        <div className="flex flex-grow items-center">
          <ul className="flex flex-row list-none lg:ml-auto">
            <li className="flex px-2 items-center">
              <Notification />
            </li>
            <li className="flex pl-2 items-center">
              <UserMenu />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
