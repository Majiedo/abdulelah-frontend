import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { Button } from "../components/ui/button";
import toast from "react-hot-toast";

const BookDetails = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/book/${slug}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [slug]);

  const handleBorrowBook = async () => {
    const response = await fetch(`http://localhost:4000/book/${slug}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok)
      return toast.error("حدث خطأ أثناء المحاولة لاستعارة الكتاب");

    toast.success("تم استعارة الكتاب");

    navigate("/books");
  };

  return (
    <div className="details">
      <BackButton />
      <img src={book.img} alt={book.title} />
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.pages}</p>
      <p>{book.lang}</p>
      {book.isBooked ? (
        <Button disabled>مستعار</Button>
      ) : (
        <Button onClick={handleBorrowBook}>استعارة</Button>
      )}
    </div>
  );
};

export default BookDetails;
