import React, { useEffect, useState } from "react";
import { Navbar } from "../components/NavBar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://abdulelah-nest-js-production.up.railway.app/book")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <h1 className="font-bold mb-5">مكتبة الكلية</h1>
      <input
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="ابحث عن طريق اسم الكتاب او مؤلف"
      />
      <main className="library">
        <div className="library__grid">
          {books
            .filter(
              (item) =>
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.author.toLowerCase().includes(search.toLowerCase()),
            )
            .map((book, index) => (
              <Link
                key={index}
                to={`/books/${book.id}`}
                className="library__item"
              >
                <img
                  src={book.img}
                  alt={book.title}
                  className="library__image"
                />
                <h2 className="library__item-title">{book.title}</h2>
                <p className="library__item-author">{book.author}</p>
              </Link>
            ))}
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Books;
