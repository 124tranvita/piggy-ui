import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { LoaderButton } from '../components/Loader';
import { useSignup } from '../hooks/useSignup';
import { MyTextInput, MyPasswordInput } from '../utils/FormikField';

/** Formik initial settings */
const initialValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(32, 'Must be 15 characters or less.')
    .min(4, 'Must be 4 characters or more. ')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(8, 'Must be 8 characters or more.')
    .required('Required'),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

const Signup = () => {
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (value) => {
    await signup(
      value.name,
      value.email,
      value.password,
      value.passwordConfirm
    );
  };

  return (
    <>
      <div className="flex justify-between items-center pt-5 fixed inset-0">
        <div className="w-full flex justify-center">
          <div className=" w-72">
            <header className="flex justify-center text-center font-bold text-2xl mb-10 text-violet-500">
              <h1>Sign in, to begin</h1>
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
                  label="Name"
                  name="name"
                  type="text"
                  className="bg-white appearance-none border-b-1 border-gray-200 mb-3 w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                />
                <MyTextInput
                  label="Email"
                  name="email"
                  type="email"
                  className="bg-white appearance-none border-b-1 border-gray-200 mb-3 w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                />
                {/* Password */}
                <MyPasswordInput
                  label="Password"
                  name="password"
                  eyeColor={'text-violet-500'}
                  className="appearance-none border-b-1 border-gray-200 mb-3 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                />
                <MyPasswordInput
                  label="Password Confirm"
                  name="passwordConfirm"
                  eyeColor={'text-violet-500'}
                  className="appearance-none border-b-1 border-gray-200 mb-3 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                />
                {/* Password */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="inline-flex justify-center items-center mt-4 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    disabled={isLoading}
                  >
                    <span
                      className={`${!isLoading ? 'hidden' : ''} duration-300`}
                    >
                      <LoaderButton />
                    </span>
                    Sign up
                  </button>
                </div>
              </Form>
            </Formik>
            <footer className="flex justify-center mt-10 text-sm font-semibold">
              <p>Already have an account?</p>
              <Link
                to="/login"
                className="mx-2 text-violet-500 hover:text-violet-600"
              >
                Login
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
