import React, { useEffect, useState } from "react";
import BookItem from "./BookItem/BookItem";
import CreateBookForm from "../../components/DialogForm/CreateBookForm";
import Loader from "../../partials/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";
import useDebounce from "../../hooks/useDebounce";
import { Container, Typography, Grid, Button, Dialog } from "@mui/material";
import { IBook } from "../../types/contextInterfaces";
import { useBooks } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import "./BookCatalog.css";

const BookCatalog: React.FC = () => {
  const {
    books,
    fetchBooks,
    hasNextPage,
    isCache,
    isLoading,
    page,
    perPage,
    removeBook,
    searchBooks,
    searchQuery,
    setPage,
    setSearchQuery,
    setSelectedBook,
    updateBook,
  } = useBooks();

  const [isCreateBookFormOpen, setIsCreateBookFormOpen] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 400);
  const navigate = useNavigate();
  const Theme = useTheme();

  const handleOpenCreateBookForm = () => {
    setIsCreateBookFormOpen(true);
  };

  const handleCloseCreateBookForm = () => {
    setIsCreateBookFormOpen(false);
  };

  const handleSelectBook = (book: IBook) => {
    setSelectedBook(book);
    navigate(`/book/${book._id}`);
  };

  const handleDeleteBook = (bookId: string) => {
    removeBook(bookId);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    searchBooks(debouncedSearchQuery, page, perPage);
    console.log("page");
  };

  useEffect(() => {
    handleSearch();
    setPage(1);
  }, [debouncedSearchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      handleSearch();
    } else {
      fetchBooks(page, perPage);
    }
    console.log({ Theme });
  }, [debouncedSearchQuery, page, perPage]);

  return (
    <Container
      className="container"
      style={{
        backgroundColor: Theme.palette.background.default,
        color: Theme.palette.primary.main,
        gap: "5px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Loader
        text={isCache ? "Caching..." : "Loading..."}
        isCaching={isCache}
        isLoading={isLoading}
      />
      <Typography variant="h4" gutterBottom>
        Book Catalog
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpenCreateBookForm}
      >
        Create New Book
      </Button>
      <SearchBar onSearch={setSearchQuery} />
      <Pagination
        count={hasNextPage ? page + 1 : page}
        page={page}
        onChange={handlePageChange}
      />
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <BookItem
              onUpdate={updateBook}
              book={book}
              onSelect={handleSelectBook}
              onDelete={handleDeleteBook}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={hasNextPage ? page + 1 : page}
        page={page}
        onChange={handlePageChange}
      />
      <Dialog
        open={isCreateBookFormOpen}
        onClose={handleCloseCreateBookForm}
        aria-labelledby="create-book-form-title"
      >
        <CreateBookForm onClose={handleCloseCreateBookForm} />
      </Dialog>
      <Typography variant="h5">
        {isCache
          ? "This page was loaded from the cache."
          : "This page was retrieved directly from the database."}
      </Typography>
    </Container>
  );
};

export default BookCatalog;
