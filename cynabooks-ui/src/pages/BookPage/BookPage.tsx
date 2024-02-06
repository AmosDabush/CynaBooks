import { useParams, useNavigate } from "react-router-dom";
import { IBook } from "../../types/contextInterfaces";
import { useBooks } from "../../context/Context";
import { useEffect, useState } from "react";
import {getBookByIdAsync} from '../../http/http';
import "./BookPage.css";
const BookPage = () => {
  const { bookId } = useParams();
  const { books, setSelectedBook } = useBooks();
  const [currentBook, setCurrentBook] = useState<IBook|undefined>(books.find((book) => book._id === bookId));
  const navigate = useNavigate();

  useEffect(() => {
    currentBook && setSelectedBook(currentBook);
    if (!currentBook && bookId) {
      getNewBook(bookId)
    }
    console.log(currentBook);
    
  }, [currentBook]);

  const getNewBook = async (bookId:string) => {
    const res = await getBookByIdAsync(bookId);
    setCurrentBook(res.data);
    return ;
  }

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="book-page">
      {!currentBook ? (
        <div className="book">
          <h1>wrong id</h1>{" "}
          <button onClick={handleGoHome} className="home-button">
            Take Me Home
          </button>
        </div>
      ) : (
        <div
          className="page"
          style={{ backgroundColor: currentBook.color }}
        >
          <div className="book-details">
            <h2>{currentBook.title}</h2>
            <h3>by {currentBook.author}</h3>
            <p>
              <b>Genre:</b> {currentBook.genre}
            </p>
            <p>
              <b>Published:</b>{" "}
              {new Date(currentBook.publicationDate).toLocaleDateString()}
            </p>
            <p>
              <b>Price:</b> ${currentBook.price.toFixed(2)}
            </p>
            <p className="book-description">{currentBook.description}</p>
          </div>{" "}
          <button onClick={handleGoHome} className="home-button">
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default BookPage;
