import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { MyTextInput } from '../../utils/FormikField';

export default function CatalogueForm({
  icon,
  title,
  fn,
  itemId,
  itemName,
  ...rest
}) {
  let [isOpen, setIsOpen] = useState(false);

  const pathURL = itemId ? `catalogues/${itemId}` : 'catalogues';

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
        {title && <span className="p-2 text-base">{title}</span>}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    initialValues={{
                      name: itemName ? itemName : '',
                    }}
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
                      fn(pathURL, value);
                      setSubmitting(false);
                      closeModal();
                    }}
                  >
                    <Form>
                      <MyTextInput
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Drink, Food, Traver..."
                      />
                      <button
                        type="submit"
                        className="inline-flex justify-center mt-4 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Submit
                      </button>
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
}
