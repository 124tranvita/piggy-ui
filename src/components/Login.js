// import { Dialog, Transition } from '@headlessui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { MdOutlineCancel } from 'react-icons/md';
import * as Yup from 'yup';

import { LoaderButton } from '../components/Loader';
import { useLogin } from '../hooks/useLogin';
import { MyTextInput, MyPasswordInput } from '../utils/FormikField';
import { DiaglogTransition } from '../utils/Transition';

/** Formik initial settings */
const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

export default function Login({ ...props }) {
  const { login, error, isLoading } = useLogin();

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (value) => {
    // console.log(email, password);
    login(value.email, value.password);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div {...props}>
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Sign in
        </button>
      </div>

      <DiaglogTransition isOpen={isOpen}>
        <button
          className="absolute right-0 top-0 mr-4 py-4"
          onClick={closeModal}
        >
          <MdOutlineCancel />
        </button>
        <header className="flex justify-center text-center font-bold text-2xl mb-10 text-emerald-500">
          <h1>
            Welcome, <br /> please authorize
          </h1>
        </header>
        {/* Display error */}
        {error && (
          <div className="text-center py-2 mb-3 rounded-md bg-rose-200 text-slate-800">
            {error}
          </div>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(value, { setSubmitting }) => {
            setSubmitting(false);
            handleSubmit(value);
          }}
        >
          <Form>
            <MyTextInput
              label="Email"
              name="email"
              type="email"
              disabled={isLoading}
              className="bg-white appearance-none border-b-1 border-gray-200 mb-3 w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
            />
            {/* Password */}
            <MyPasswordInput
              label="Password"
              name="password"
              disabled={isLoading}
              eyeColor={'text-emerald-500'}
              className="appearance-none border-b-1 border-gray-200 mb-3 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-emerald-600"
            />
            <div className="text-sm text-slate-500 hover:text-slate-600">
              <Link to="#0">Forgot password?</Link>
            </div>
            {/* Password */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex justify-center items-center mt-4 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                disabled={isLoading}
              >
                <span className={`${!isLoading ? 'hidden' : ''} duration-300`}>
                  <LoaderButton />
                </span>
                Sign in
              </button>
            </div>
          </Form>
        </Formik>
        <footer className="flex justify-center mt-10 text-sm font-semibold">
          <p>New user?</p>
          <Link
            to="#0"
            className="mx-2 text-emerald-500 hover:text-emerald-600"
          >
            Sign up
          </Link>
        </footer>
      </DiaglogTransition>
    </>
  );
}
