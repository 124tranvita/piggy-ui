import { useNavigate } from 'react-router-dom';
import images from '../assets/images';

export default function Error() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <img src={images.error} height="320" width="320" alt="error" />
        <h1 className="font-bold text-4xl text-slate-800">
          Oops! Page not found!
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="btn border-1 py-2 px-4 rounded-md bg-rose-500 hover:bg-rose-400 text-white mt-4"
        >
          Back
        </button>
      </div>
    </>
  );
}
