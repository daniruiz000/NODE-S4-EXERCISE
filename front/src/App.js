import React from "react";
import "./App.css";

function App() {
  const API_URL = "https://node-s4-exercise.vercel.app/book";
  const [books, setBooks] = React.useState();
  React.useEffect(() => {
    fetch(API_URL)
      .then((books) => books.json())
      .then((booksParsed) => setBooks(booksParsed));
  }, []);

  return (
    <div className="App">
      <h2>Libros</h2>
      <ul>
        {books?.data.map((book) => {
          return <li key={book._id}>{book.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
