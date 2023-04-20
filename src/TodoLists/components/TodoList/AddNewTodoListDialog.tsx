import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { TodoList } from "../../../types/todoListTypes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormErrorMessage } from "../../../common/FormErrorMessage/FormErrorMessage";

interface AddNewTodoListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNew: (newList: TodoList) => void;
}

type FormData = {
  name: string;
};

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

export const AddNewTodoListDialog = ({
  isOpen,
  onClose,
  onAddNew,
}: AddNewTodoListDialogProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    onAddNew({
      id: new Date().getTime(),
      name: data.name,
      items: [],
    });
    reset();
    onClose();
  });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add new Todo list
                </Dialog.Title>
                <form onSubmit={onSubmit}>
                  <div className="mt-2">
                    <label>Name of Todo list</label>
                    <input
                      {...register("name")}
                      className="input input-bordered w-full max-w-xs"
                    />
                    {errors.name?.message && (
                      <FormErrorMessage message={errors.name.message} />
                    )}
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="mx-1 inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Add new
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mx-1 inline-flex justify-center rounded-md border border-transparent bg-grey-100 px-4 py-2 text-sm font-medium text-grey-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
