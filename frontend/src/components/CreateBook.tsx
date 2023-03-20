import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Input } from "./Input";
import { Label } from "./Label";
import { Formik } from "formik";
import * as Yup from "yup";
import { IBook } from "../interface/book.interface";
import { Button } from "./Button";
import { ErrorLabel } from "./ErrorLabel";
import { BookApiService } from "../api/services/book";
import { Textarea } from "./Textarea";

let initialValues: IBook = {
  title: "",
  author: "",
  description: "",
  isbn: "",
  cover: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  isbn: Yup.string().required("ISBN is required"),
  description: Yup.string(),
  cover: Yup.string(),
});

export default function CreateBook({
  show,
  onToggle,
  editBook,
  onCreatedBook,
  onUpdateBook,
}: {
  show: boolean;
  editBook: IBook | undefined;
  onToggle: (status: boolean) => void;
  onCreatedBook: () => void;
  onUpdateBook: (book: IBook) => void;
}) {
  const [error, setError] = useState("");
  const { data, refetch } = BookApiService.useList();
  const [currentValue, setCurrentValue] = useState<IBook>();

  const { mutate } = BookApiService.createBook({
    onSuccessCb: () => {
      onCreatedBook();
      onToggle(false);
    },
    onErrorCb: (err) => {
      setError("A book with the same ISBN had been created");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const { mutate: update } = BookApiService.updateBook({
    onSettled: () => {
      refetch();
      if (currentValue) onUpdateBook(currentValue);
      onToggle(false);
      setLoading(false);
    },
  });

  const [loading, setLoading] = useState(false);

  function onFormSubmit(values: IBook) {
    setLoading(true);
    mutate(values);
  }

  function handleUpdate(values: IBook) {
    onUpdateBook(values);
    setLoading(true);
    update(values);
  }

  if (editBook) {
    initialValues = editBook;
  }

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => onToggle(false)}
        >
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
                    {editBook ? editBook.title : "New book"}
                  </Dialog.Title>
                  <div className="mt-2 mb-4">
                    <p className="text-sm text-gray-500">
                      A great book should leave you with many experiences, and
                      slightly exhausted at the end. You live several lives
                      while reading.
                    </p>
                  </div>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      setSubmitting(false);
                      onFormSubmit(values);
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="flex items-center mb-3">
                          <Label className="w-1/3" htmlFor="title">
                            Title{" "}
                            <span className="text-sm text-red-400 ml-1">*</span>
                          </Label>
                          <div className="w-full">
                            <Input
                              type="text"
                              id="title"
                              name="title"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.title}
                              placeholder="The World of Ice & Fire"
                            />
                            {errors.title && touched.title && (
                              <ErrorLabel className="text-xs">
                                {errors.title}
                              </ErrorLabel>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center mb-3">
                          <Label className="w-1/3" htmlFor="author">
                            Author
                            <span className="text-sm text-red-400 ml-1">*</span>
                          </Label>
                          <div className="w-full">
                            <Input
                              type="text"
                              id="author"
                              name="author"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.author}
                              placeholder="George R. R. Martin"
                            />
                            {errors.author && touched.author && (
                              <ErrorLabel className="text-xs">
                                {errors.author}
                              </ErrorLabel>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center mb-3">
                          <Label className="w-1/3" htmlFor="isbn">
                            ISBN
                            <span className="text-sm text-red-400 ml-1">*</span>
                          </Label>
                          <div className="w-full">
                            <Input
                              type="text"
                              id="isbn"
                              name="isbn"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.isbn}
                              placeholder="0553805444"
                            />
                            {errors.isbn && touched.isbn && (
                              <ErrorLabel className="text-xs">
                                {errors.isbn}
                              </ErrorLabel>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center mb-3">
                          <Label className="w-1/3" htmlFor="description">
                            Description
                          </Label>
                          <div className="w-full">
                            <Textarea
                              rows={5}
                              id="description"
                              name="description"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.description}
                              placeholder="The fantasy saga of our time"
                            />
                            {errors.description && touched.description && (
                              <ErrorLabel className="text-xs">
                                {errors.description}
                              </ErrorLabel>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center mb-3">
                          <Label className="w-1/3" htmlFor="cover">
                            Cover
                          </Label>
                          <Input
                            type="text"
                            id="cover"
                            name="cover"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.cover}
                            placeholder="https://example.com/"
                          />
                        </div>

                        {!editBook ? (
                          <Button
                            className="w-full mt-5 bg-violet-500"
                            loading={loading}
                            type="submit"
                            disabled={isSubmitting}
                            onClick={() => handleSubmit()}
                          >
                            Create
                          </Button>
                        ) : (
                          <Button
                            className="w-full mt-5 bg-violet-500"
                            loading={loading}
                            disabled={isSubmitting}
                            onClick={() => handleUpdate(values)}
                          >
                            Update
                          </Button>
                        )}
                      </form>
                    )}
                  </Formik>

                  <a
                    type="button"
                    className="w-full cursor-pointer text-sm text-center mt-4 hover:underline"
                    onClick={() => onToggle(false)}
                  >
                    Cancel
                  </a>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={!!error} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => onToggle(false)}
        >
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
                  <div className="mt-2 mb-4">
                    <p className="text-sm text-gray-500">{error}</p>
                  </div>
                  <a
                    type="button"
                    className="w-full cursor-pointer text-sm text-center mt-4 hover:underline"
                    onClick={() => setError("")}
                  >
                    Back
                  </a>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
