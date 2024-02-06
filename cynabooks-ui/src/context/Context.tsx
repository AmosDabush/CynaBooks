import { createContext, useContext, useState, ReactNode } from "react";
import { useQueryClient } from "react-query";
import { Configs } from "../constants/constants";
import {
  getBooksAsync,
  addBookAsync,
  updateBookAsync,
  searchBooksAsync,
  removeBookAsync,
} from "../http/http";
import { IBook, IBooksContext } from "../types/contextInterfaces";
import { toast } from "react-toastify";

const BooksContext = createContext<IBooksContext | undefined>(undefined);

export function BooksProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<IBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [isCache, setIsCache] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(Configs.page_limit_pagination);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchBooks = async (page: number, perPage: number) => {
    try {
      setIsLoading(true);
      const cacheKey = ["books", page];
      const cachedData = queryClient.getQueryData<{
        books: IBook[];
        hasNextPage: boolean;
      }>(cacheKey);

      if (cachedData) {
        toast.info("fetching from cache");
        setIsCache(true);
        setBooks(cachedData.books);
        setHasNextPage(cachedData.hasNextPage);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);

        return;
      }

      const response = await getBooksAsync({ page, perPage });
      toast.info("fetching from server");

      const { books, pageInfo } = response.data;

      const newData = {
        books: books,
        hasNextPage: pageInfo.hasNextPage,
      };

      queryClient.setQueryData(cacheKey, newData);

      setBooks(books);
      setHasNextPage(pageInfo.hasNextPage);
      setIsCache(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setIsError(true);
      setIsLoading(false);
      toast.error("Failed to fetch books.");
    }
  };

  const clearCatch = async () => {
    await queryClient.invalidateQueries("books");
    queryClient.removeQueries();
  };

  const addBook = async (book: Partial<IBook>) => {
    try {
      const response = await addBookAsync(book);
      if (books.length < 9)
        setBooks((prevBooks) => [...prevBooks, response.data.book]);
      await clearCatch();
      fetchBooks(page, Configs.page_limit_pagination);
      toast.success("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
      setIsError(true);
      toast.error("Failed to add book.");
    }
  };

  const removeBook = async (bookId: string) => {
    try {
      await removeBookAsync(bookId);
      await clearCatch();
      if (books.length === 1) {
        if (page === 1) {
          setBooks([]);
          return;
        }

        setPage(page - 1);
      }
      if (searchQuery) {
        searchBooks(searchQuery, page, perPage);
      } else {
        fetchBooks(page, perPage);
      }
      toast.success("Book removed successfully!");
    } catch (error) {
      console.error(`Error removing book with ID ${bookId}:`, error);
      setIsError(true);
      toast.error(`Failed to remove book.`);
    }
  };

  const updateBook = async (bookId: string, data: Partial<IBook>) => {
    try {
      const response = await updateBookAsync({ bookId, book: data });
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookId ? response.data.book : book
        )
      );
      await clearCatch();
      toast.success("Book updated successfully!");
    } catch (error) {
      console.error(`Error updating book with ID ${bookId}:`, error);
      setIsError(true);
      toast.error("Failed to update book.");
    }
  };

  const searchBooks = async (query: string, page: number, perPage: number) => {
    try {
      const response = await searchBooksAsync({ query, page, perPage });

      const { books, pageInfo } = response.data;

      setBooks(books);
      setIsCache(false);
      setHasNextPage(pageInfo.hasNextPage);
    } catch (error) {
      console.error(`Error searching for books with query ${query}:`, error);
    }
  };

  const value = {
    addBook,
    books,
    fetchBooks,
    hasNextPage,
    isCache,
    isError,
    isLoading,
    page,
    perPage,
    removeBook,
    searchBooks,
    searchQuery,
    selectedBook,
    setHasNextPage,
    setPage,
    setPerPage,
    setSearchQuery,
    setSelectedBook,
    updateBook,
  };

  return (
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
}
