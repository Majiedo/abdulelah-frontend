import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BookModal from "./BookModal";
import AlertModal from "./AlertModal";

const BooksTable = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [bookModal, setBookModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [deleteAlert, setDeleteAlert] = useState({
    open: false,
    id: "",
  });
  const [returnAlert, setReturnAlert] = useState({
    open: false,
    id: "",
  });

  const getAllBooks = () => {
    fetch("http://localhost:4000/book")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  const handleDeleteBook = async (id) => {
    const response = await fetch(`http://localhost:4000/book/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) return toast.error("حدث خطأ محاولة حذف كتاب");

    getAllBooks();

    toast.success("تم حذف كتاب");
  };

  const handleReturnBook = async (id) => {
    const response = await fetch(`http://localhost:4000/book/return/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) return toast.error("حدث خطأ محاولة استرجاع كتاب");

    getAllBooks();

    toast.success("تم استرجاع كتاب");
  };

  const handleCreateBook = async (title, author, img, pages, lang) => {
    const response = await fetch("http://localhost:4000/book", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        img,
        author,
        lang,
        pages: Number(pages),
      }),
    });

    if (!response.ok) return toast.error("حدث خطأ محاولة اضافة كتاب");

    getAllBooks();

    toast.success("تم اضافة كتاب");
    setBookModal(false);
  };

  const handleEditBook = async (id, title, author, img, pages, lang) => {
    const response = await fetch(`http://localhost:4000/book/edit/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        img,
        author,
        lang,
        pages: Number(pages),
      }),
    });

    if (!response.ok) return toast.error("حدث خطأ محاولة تعديل كتاب");

    getAllBooks();

    toast.success("تم تعديل كتاب");
    setBookModal(false);
  };

  return (
    <div>
      <div className="flex items-center gap-4 my-5">
        {user.role === "LIBRARIAN" && (
          <Button onClick={() => setBookModal(true)}>اضافة كتاب</Button>
        )}
        <input
          className="m-0 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن طريق اسم الكتاب او مؤلف"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead>ID</TableHead> */}
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Pages</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Borrow</TableHead>
            <TableHead>Borrow By</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books
            .filter(
              (item) =>
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.author.toLowerCase().includes(search.toLowerCase())
            )
            .map((book) => (
              <TableRow key={book.id}>
                <TableCell className="text-left">{book.title}</TableCell>
                <TableCell className="text-left">{book.author}</TableCell>
                <TableCell className="text-left">{book.pages}</TableCell>
                <TableCell className="text-left">{book.lang}</TableCell>
                <TableCell className="text-left">
                  {book.isBooked ? "Yes" : "No"}
                </TableCell>
                <TableCell className="text-left">
                  {book.bookedByUsername ?? "No one"}
                </TableCell>
                <TableCell className="text-left">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        disabled={!book.isBooked}
                        onClick={() =>
                          setReturnAlert({ open: true, id: book.id })
                        }
                      >
                        Return
                      </DropdownMenuItem>
                      {user.role === "LIBRARIAN" && <DropdownMenuSeparator />}
                      {user.role === "LIBRARIAN" && (
                        <DropdownMenuItem
                          disabled={book.isBooked}
                          onClick={() => {
                            setSelectedBook(book);
                            setBookModal(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                      )}
                      {user.role === "LIBRARIAN" && (
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() =>
                            setDeleteAlert({ open: true, id: book.id })
                          }
                        >
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter className="w-full">
          <TableRow className="text-left">
            <TableCell colSpan={6}>Total</TableCell>
            <TableCell className="text-right">
              {
                books.filter(
                  (item) =>
                    item.title.toLowerCase().includes(search.toLowerCase()) ||
                    item.author.toLowerCase().includes(search.toLowerCase())
                ).length
              }
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <BookModal
        setIsOpen={setBookModal}
        open={bookModal}
        defaultValues={selectedBook}
        setDefaultValues={setSelectedBook}
        onCreate={handleCreateBook}
        onUpdate={handleEditBook}
      />
      <AlertModal
        open={deleteAlert.open}
        setOpen={setDeleteAlert}
        onClick={() => handleDeleteBook(deleteAlert.id)}
        buttonText="حذف"
      />
      <AlertModal
        open={returnAlert.open}
        setOpen={setReturnAlert}
        onClick={() => handleReturnBook(returnAlert.id)}
        buttonText="استرجاع"
      />
    </div>
  );
};

export default BooksTable;
