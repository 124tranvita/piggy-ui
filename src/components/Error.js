import { Link } from 'react-router-dom';
import { TbFaceIdError } from 'react-icons/tb';
import { MdOutlineList } from 'react-icons/md';

export const NoDataError = () => {
  /**Reload page */
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen80">
        <div className=" text-6xl text-slate-800">
          <TbFaceIdError />
        </div>
        <h1 className="font-bold text-xl text-slate-500">
          Oops! Something went wrong!
        </h1>
        <button
          onClick={refreshPage}
          className="btn border-1 py-2 px-4 rounded-md bg-rose-500 hover:bg-rose-400 text-white mt-4"
        >
          Reload
        </button>
      </div>
    </>
  );
};

export const NoCatalogueError = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen80">
        <div className=" text-6xl text-orange-500">
          <MdOutlineList />
        </div>
        <h1 className="font-bold text-xl text-slate-500">
          You must have at least one catalogue item to continue.
        </h1>
        <Link to="/catalogues">
          <button className="btn border-1 py-2 px-4 rounded-md bg-rose-500 hover:bg-rose-400 text-white mt-4">
            Catalogues
          </button>
        </Link>
      </div>
    </>
  );
};
