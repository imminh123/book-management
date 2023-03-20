import { useContext, useEffect, useRef, useState } from "react";
import Book from "../components/Book/Book";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import BookDetail from "../components/Book/BookDetail";
import { IBook } from "../interface/book.interface";
import { Transition } from "@headlessui/react";
import CreateBook from "../components/CreateBook";
import { BookApiService } from "../api/services/book";
import { UserContext } from "../context/user.context";

export const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [showCreateBook, setShowCreateBook] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [bookToUpdate, setBookToUpdate] = useState<IBook>();
  const [selectedBook, setSelectedBook] = useState<IBook>();
  const { data: books, refetch } = BookApiService.useList();
  const ref: any = useRef();

  function selectBook(item: IBook) {
    if (!showSidebar) setShowSidebar(true);
    setSelectedBook(item);
    if (ref && ref.current) ref.current.changeBook(item);
  }

  function editBook(item: IBook) {
    setShowCreateBook(true);
    setBookToUpdate(item);
  }

  useEffect(() => {
    if (books) {
      setSelectedBook(books.items[0]);
    }
  }, [books]);

  return (
    <div className="relative overflow-x-auto">
      <section className="flex">
        <section className="px-12 mt-4 w-2/3">
          <Header onClick={() => setShowCreateBook(true)} />
          <div>
            <div className="text-4xl text-black lg:text-5xl font-bold">
              <h1>Happy reading, {user.username}</h1>
            </div>

            <p className="mt-6 text-sm">
              Wow! you've delved deep into the wizarding world's secrets. Have
              Harry's parents died yet? Oops, looks like you're not there yet.
              Get reading now!
            </p>

            <Button
              className="text-sm mt-5 bg-black"
              onClick={() => window.scrollBy(0, 100)}
            >
              Start reading
            </Button>
          </div>

          <div id="bookList" className="mt-8">
            <h2 className="font-medium mb-4 text-2xl">Your Bookshelf</h2>
            <ul className="grid grid-cols-4 gap-5">
              {books &&
                books.items.map((item) => (
                  <li key={item.isbn}>
                    <Book onClick={() => selectBook(item)} data={item} />
                  </li>
                ))}
            </ul>
          </div>
        </section>

        <aside className="fixed top-0 right-0 h-full bg-white w-1/3">
          {selectedBook && (
            <BookDetail ref={ref} data={selectedBook} onEdit={editBook} />
          )}
        </aside>
      </section>

      <div className="media-container">
        <CreateBook
          show={showCreateBook}
          onToggle={setShowCreateBook}
          editBook={bookToUpdate}
          onCreatedBook={refetch}
          onUpdateBook={(book) => selectBook(book)}
        />
      </div>
    </div>
  );
};
