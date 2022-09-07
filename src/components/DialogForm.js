import { Dialog, Transition } from '@headlessui/react';
import { CgSpinner } from 'react-icons/cg';
import { Fragment, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { MyTextInput } from '../utils/FormikField';
import { postData } from '../utils/fetchData';

import { useAuthContext } from '../hooks/useAuthContext';
import { useNotificationContext } from '../hooks/useNotificationContext';

export const IncomeForm = ({
  icon,
  title,
  fn,
  id,
  row,
  isUpdateModal,
  ...rest
}) => {
  const { user } = useAuthContext();
  const { dispatch } = useNotificationContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pathURL = id ? `incomes/${id}` : 'incomes';

  console.log(isUpdateModal);

  useEffect(() => {
    if (isUpdateModal) setIsOpen(true);
  }, [isUpdateModal]);

  const handleSubmit = (value) => {
    setIsLoading(true);

    postData(pathURL, user.token, value, dispatch).then((result) => {
      fn(result.data);
      setIsLoading(false);
    });

    setIsLoading(false);
    closeModal();
  };

  const initialValues = row
    ? {
        name: row.name,
        amount: row.amount,
      }
    : {
        name: '',
        amount: 0,
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
        {icon}
        {title && <span className="mx-2">{title}</span>}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title> */}
                  {/* FORM */}
                  <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                      name: Yup.string()
                        .min(2, 'Name must be greater or equal to 2 characters')
                        .max(
                          16,
                          'Name mus be lesser or equal to 16 characters.'
                        )
                        .required('Required'),
                    })}
                    onSubmit={(value, { setSubmitting }) => {
                      setSubmitting(false);
                      handleSubmit(value);
                      // setIsLoading(true);
                      // closeModal();
                    }}
                  >
                    <Form>
                      <MyTextInput
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Salary, Save, Loan..."
                      />
                      <MyTextInput label="Amount" name="amount" type="number" />
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex justify-center items-center mt-4 mr-2 rounded-md border border-transparent bg-rose-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Close
                        </button>

                        <button
                          type="submit"
                          className="inline-flex justify-center items-center mt-4 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          <div
                            role="status"
                            className={`${
                              !isLoading ? 'hidden' : ''
                            } duration-200`}
                          >
                            <svg
                              aria-hidden="true"
                              className="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          </div>{' '}
                          Submit
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export const IncomeAlwaysOpenForm = ({ icon, title, fn, id, row, ...rest }) => {
  const { user } = useAuthContext();
  const { dispatch } = useNotificationContext();

  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const pathURL = id ? `incomes/${id}` : 'incomes';
  const method = id ? 'PATCH' : 'POST';

  const handleSubmit = (value) => {
    setIsLoading(true);

    postData(pathURL, user.token, value, dispatch).then((result) => {
      fn(result.data);
      setIsLoading(false);
    });

    setIsLoading(false);
    closeModal();
  };

  const initialValues = row
    ? {
        name: row.name,
        amount: row.amount,
      }
    : {
        name: '',
        amount: 0,
      };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title> */}
                  {/* FORM */}
                  <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                      name: Yup.string()
                        .min(2, 'Name must be greater or equal to 2 characters')
                        .max(
                          16,
                          'Name mus be lesser or equal to 16 characters.'
                        )
                        .required('Required'),
                    })}
                    onSubmit={(value, { setSubmitting }) => {
                      setSubmitting(false);
                      handleSubmit(value);
                      // setIsLoading(true);
                      // closeModal();
                    }}
                  >
                    <Form>
                      <MyTextInput
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Salary, Save, Loan..."
                      />
                      <MyTextInput label="Amount" name="amount" type="number" />
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex justify-center items-center mt-4 mr-2 rounded-md border border-transparent bg-rose-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Close
                        </button>

                        <button
                          type="submit"
                          className="inline-flex justify-center items-center mt-4 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          <div
                            role="status"
                            className={`${
                              !isLoading ? 'hidden' : ''
                            } duration-200`}
                          >
                            <svg
                              aria-hidden="true"
                              className="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          </div>{' '}
                          Submit
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
