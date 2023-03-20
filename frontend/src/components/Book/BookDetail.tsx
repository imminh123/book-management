import { forwardRef, Fragment, useImperativeHandle, useState } from "react";
import { IBook } from "../../interface/book.interface";
import { Button } from "../Button";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Transition, Menu, Dialog } from "@headlessui/react";
import Account from "../Account";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import DefaultCover from "../../assets/defaultCover.jpg";
import { BookApiService } from "../../api/services/book";

interface IProps {
  data: IBook;
  onEdit: (book: IBook) => void;
}
const BookDetail = forwardRef(({ data, onEdit }: IProps, ref) => {
  const [listBooks, setListBooks] = useState([data]);

  const addBook = (item: IBook) => {
    const currentDisplayBook = listBooks[listBooks.length - 1];
    setListBooks((prev) => [...prev, item]);
  };

  const removeBook = (item: IBook) => {
    setListBooks((prev) => [...prev, item]);
  };

  return (
    <div className="p-6">
      <Account />
      <hr className="mb-8" />
      <Swiper className="swiper" loop={false}>
        {listBooks.map((item, index) => (
          <SwiperSlide key={index}>
            <BookDetailContent
              ref={ref}
              data={item}
              addBook={addBook}
              removeBook={removeBook}
              editBook={onEdit}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <h2 className="mt-5 font-medium">Summary</h2>
      <p>{listBooks[listBooks.length - 1].description}</p>
    </div>
  );
});

const BookDetailContent = forwardRef(
  ({ data, addBook, editBook, removeBook }: any, ref) => {
    const swiper = useSwiper();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { refetch } = BookApiService.useList();
    const { mutate } = BookApiService.deleteBook({
      onSettled: () => {
        refetch();
        setConfirmDelete(false);
      },
    });

    useImperativeHandle(ref, () => ({
      changeBook(item: IBook) {
        if (swiper) {
          addBook(item);
          setTimeout(() => {
            swiper.slideNext();
          }, 0);
        }
      },
    }));

    function onDelete() {
      setConfirmDelete(true);
    }

    function handleDelete() {
      mutate(data._id);
    }

    return (
      <>
        <figure className="bookDetail xl:flex">
          <picture className="w-1/2 xl:mr-4">
            <img
              className="h-72 object-cover"
              style={{
                boxShadow: "-5px 5px 12px 0px rgba(0, 0, 0, 0.5)",
              }}
              src={data.cover || DefaultCover}
              alt={data.title}
            />
          </picture>
          <figcaption className="xl:w-1/2">
            <h2 className="text-2xl font-medium mb-2">{data.title}</h2>
            <p>{data.author}</p>
            <p className="text-sm font-medium my-2 mb-5">#{data.isbn}</p>
            <Action onDelete={onDelete} onEdit={() => editBook(data)} />
          </figcaption>
        </figure>

        <Transition appear show={confirmDelete} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setConfirmDelete(false)}
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
                      {`You are about to delete `}{" "}
                      <span className="text-violet-500">{data.title}</span>
                    </Dialog.Title>

                    <div className="flex mt-5">
                      <Button
                        className="bg-violet-500 w-full mr-5"
                        onClick={handleDelete}
                      >
                        Got it{" "}
                      </Button>
                      <Button
                        className="bg-black w-full"
                        onClick={() => setConfirmDelete(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }
);

export default BookDetail;

function Action({
  onDelete,
  onEdit,
}: {
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-full bg-violet-500  px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          Actions
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute bg-red left-0 -top-24 xl:top-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onEdit}
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <EditInactiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <EditInactiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onDelete}
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <DeleteActiveIcon
                      className="mr-2 h-5 w-5 text-violet-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <DeleteInactiveIcon
                      className="mr-2 h-5 w-5 text-violet-400"
                      aria-hidden="true"
                    />
                  )}
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function EditInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function DeleteInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}
