import { Link } from 'react-router-dom';
import {
  TbLayoutDashboard,
  TbTrendingUp,
  TbList,
  TbReport,
} from 'react-icons/tb';

import images from '../assets/images';

export default function Home() {
  return (
    <div className="relative">
      <div className="flex justify-between items-center pt-5 fixed inset-0">
        <div className="w-full mb:w-1/2 hidden md:block duration-300">
          <img src={images.signup} alt="login" className="w-full" />
        </div>
        <div className="w-full mb:w-1/2 flex justify-center">
          <div className="w-2/3 lg:w-1/2">
            <header className="">
              <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 text-violet-500">
                The happy PiGGY!
              </h1>
              <p className="text-slate-500">
                Simple and easy budget management project
              </p>
            </header>
            {/* Feature icons */}
            <div className="flex justify-between text-5xl md:text-6xl lg:text-7xl xl:text-8xl py-4">
              <div className="text-blue-500 cursor-pointer">
                <TbLayoutDashboard />
              </div>
              <div className="text-emerald-500 cursor-pointer">
                <TbTrendingUp />
              </div>
              <div className="text-orange-500 cursor-pointer">
                <TbList />
              </div>
              <div className="text-indigo-500 cursor-pointer">
                <TbReport />
              </div>
            </div>

            {/* Login/Signup buttons */}
            <div>
              <Link to="/login">
                <button
                  type="submit"
                  className="inline-flex justify-center items-center mt-4 rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Sign in
                </button>
              </Link>
              <Link to="/signup">
                <button
                  type="submit"
                  className="inline-flex justify-center items-center mt-4 ml-4 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
