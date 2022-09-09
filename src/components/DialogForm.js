import { Fragment, useState } from 'react';
import { Formik, Form } from 'formik';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';

import { LoaderButton } from './Loader';

import { postData } from '../utils/fetchData';
import { DiaglogTransition } from '../utils/Transition';

import { useAuthContext } from '../hooks/useAuthContext';
import { useNotificationContext } from '../hooks/useNotificationContext';

export const AddDialogForm = ({
  children,
  path,
  fn,
  initialValues,
  validationSchema,
  ...rest
}) => {
  const { user } = useAuthContext();
  const { dispatch } = useNotificationContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (value) => {
    setIsLoading(true);

    postData(path, user.token, value, dispatch).then((result) => {
      fn(result.data);
      setIsLoading(false);
    });

    setIsLoading(false);
    closeModal();
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button {...rest} onClick={openModal}>
        <AiOutlineAppstoreAdd />
        <span className="mx-2">Add item</span>
      </button>
      <DiaglogTransition isOpen={isOpen}>
        {/* FORM */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(value, { setSubmitting }) => {
            setSubmitting(false);
            handleSubmit(value);
          }}
        >
          <Form>
            {children}
            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex justify-center items-center mt-4 mr-2 rounded-md border border-transparent bg-rose-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-rose-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Close
              </button>

              <button
                type="submit"
                className="inline-flex justify-center items-center mt-4 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <LoaderButton isLoading={isLoading} />
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </DiaglogTransition>
    </>
  );
};
