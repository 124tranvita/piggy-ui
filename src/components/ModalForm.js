import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import dateFormat from 'dateformat';

import { MyTextInput } from '../utils/FormikField';
import { DiaglogTransition } from '../utils/Transition';
import { patchData, deleteData } from '../utils/fetchData';
import { ButtonLoader } from '../utils/ButtonLoader';

import { useAuthContext } from '../hooks/useAuthContext';
import { useNotificationContext } from '../hooks/useNotificationContext';

export const UpdateModalForm = ({ isOpen, setIsOpen, path, data, fn }) => {
  const { user } = useAuthContext();
  const { dispatch } = useNotificationContext();
  const [isLoading, setIsLoading] = useState(false);

  const pathURL = `${path}/${data.id}`;

  const handleSubmit = (value) => {
    setIsLoading(true);

    patchData(pathURL, user.token, value, dispatch).then((result) => {
      fn(result.data.data);
      setIsLoading(false);
    });

    setIsLoading(false);
    closeModal();
  };

  const initialValues = {
    name: data.name,
    createAt: dateFormat(data.createAt, 'yyyy-mm-dd'),
    amount: data.amount,
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <DiaglogTransition isOpen={isOpen}>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(2, 'Name must be greater or equal to 2 characters')
              .max(16, 'Name mus be lesser or equal to 16 characters.')
              .required('Required'),
            createAt: Yup.date()
              .max(
                new Date(),
                'Create date must lesser or equal to current day.'
              )
              .required('Yêu cầu nhập'),
          })}
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
              placeholder="Salary, Save, Loan..."
            />
            <MyTextInput label="Date" name="createAt" type="date" />
            <MyTextInput label="Amount" name="amount" type="number" />
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center items-center mt-4 mr-2 rounded-md border border-transparent bg-rose-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-rose-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Close
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex justify-center items-center mt-4 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <ButtonLoader isLoading={isLoading} />
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

  const handleDelete = (value) => {
    setIsLoading(true);

    deleteData(pathURL, user.token, id, dispatch).then((result) => {
      fn(id);
      setIsLoading(false);
    });

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
            <ButtonLoader isLoading={isLoading} />
            Yes
          </button>
        </div>
      </DiaglogTransition>
    </>
  );
};
