import React, { useEffect, useState } from "react";
import { Navbar } from "../components/NavBar";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/book")
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
                item.author.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, index) => (
              <Link
                to={`/books/${item.id}`}
                key={index}
                className="library__item"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="library__image"
                />
                <h2 className="library__item-title">{item.title}</h2>
                <p className="library__item-author">{item.author}</p>
              </Link>
            ))}
        </div>
      </main>
    </React.Fragment>
  );
};

export default Books;
