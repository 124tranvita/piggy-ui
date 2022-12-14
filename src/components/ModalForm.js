import { useState } from 'react';
import { Formik, Form } from 'formik';
import dateFormat from 'dateformat';

import { LoaderButton } from './Loader';

import { DiaglogTransition } from '../utils/Transition';
import { patchData, deleteData } from '../utils/fetchData';

import { useAuthContext } from '../hooks/useAuthContext';
import { useNotificationContext } from '../hooks/useNotificationContext';

export const UpdateModalForm = ({
  children,
  isOpen,
  setIsOpen,
  initialValues,
  validationSchema,
  path,
  data,
  fn,
}) => {
  const { user } = useAuthContext();
  const { dispatch } = useNotificationContext();

  const [isLoading, setIsLoading] = useState(false);

  if (data) {
    initialValues = { ...initialValues, ...data };
    initialValues.createAt = dateFormat(data.createAt, 'yyyy-mm-dd');
  }

  /** Temporary solution for set initial values of catalogues list where data.catalogue is Object */
  if (data.catalogue) {
    initialValues.catalogue = data.catalogue.id;
  }

  const pathURL = `${path}/${data.id ?? data._id}`;

  const handleSubmit = async (value) => {
    setIsLoading(true);
    const result = await patchData(pathURL, user.token, value, dispatch);

    if (!result) {
      setIsLoading(false);
      closeModal();
    }

    fn(result.data.data);
    setIsLoading(false);

    closeModal();
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <DiaglogTransition isOpen={isOpen}>
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
                disabled={isLoading}
              >
                <span className={`${!isLoading ? 'hidden' : ''} duration-300`}>
                  <LoaderButton />
                </span>
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </DiaglogTransition>
    </>
  );
};

export const ConfirmModal = ({ isOpen, setIsOpen, path, id, fn }) => {
  const { user } = useAuthContext();
  const { dispatch } = useNotificationContext();
  const [isLoading, setIsLoading] = useState(false);

  const pathURL = `${path}/${id}`;

  const handleDelete = async (value) => {
    setIsLoading(true);

    const result = await deleteData(pathURL, user.token, dispatch);

    if (!result) {
      setIsLoading(false);
      closeModal();
      return;
    }

    fn(id);
    setIsLoading(false);

    closeModal();
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <DiaglogTransition isOpen={isOpen} title={'Are you sure?'}>
        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex justify-center items-center mt-4 mr-2 rounded-md border border-transparent bg-rose-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-rose-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            No
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center items-center mt-4 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={handleDelete}
          >
            <span className={`${!isLoading ? 'hidden' : ''} duration-300`}>
              <LoaderButton />
            </span>
            Yes
          </button>
        </div>
      </DiaglogTransition>
    </>
  );
};
