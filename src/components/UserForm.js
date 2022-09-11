import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

import { useAuthContext } from '../hooks/useAuthContext';

import { LoaderButton } from './Loader';

import { MyTextInput, MyPasswordInput } from '../utils/FormikField';

export default function UserForm() {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: user.data.user.name,
    email: user.data.user.email,
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(32, 'Must be 15 characters or less.')
      .min(4, 'Must be 4 characters or more. ')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    passwordCurrent: Yup.string().required('Required'),
    password: Yup.string()
      .min(8, 'Must be 8 characters or more.')
      .required('Required'),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  });

  return (
    <div className="w-full lg:w-1/3">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(value, { setSubmitting }) => {
          alert(JSON.stringify(value));
          setSubmitting(false);
          // handleSubmit(value);
        }}
      >
        <Form>
          <MyTextInput
            label="Email"
            name="email"
            type="email"
            disabled={true}
            className="bg-white appearance-none border-b-1 border-gray-200 mb-3 w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
          />
          <MyTextInput
            label="Name"
            name="name"
            type="text"
            className="appearance-none border-b-1 border-gray-200 mb-3 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-400"
          />

          {/* Password */}
          <MyPasswordInput
            label="Current Password"
            name="passwordCurrent"
            className="appearance-none border-b-1 border-gray-200 mb-3 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-400"
          />
          <MyPasswordInput
            label="Password"
            name="password"
            className="appearance-none border-b-1 border-gray-200 mb-3 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-400"
          />
          <MyPasswordInput
            label="Passwor Confirm"
            name="passwordConfirm"
            className="appearance-none border-b-1 border-gray-200 mb-3 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-400"
          />
          {/* Password */}

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex justify-center items-center mt-4 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <span className={`${!isLoading ? 'hidden' : ''} duration-300`}>
                <LoaderButton />
              </span>
              Update Profile
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
