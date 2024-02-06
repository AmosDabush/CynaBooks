import axios from "axios";
import { IBook } from "../types/contextInterfaces";
const API_URL = process.env.API_URL || "http://localhost:3000/api";

export const getBooksAsync = async ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) =>
  await axios.get(`${API_URL}/books`, {
    params: { page, limit: perPage },
  });

export const addBookAsync = async (book: Partial<IBook>) =>
  await axios.post(`${API_URL}/books`, book);

export const updateBookAsync = async ({
  book,
  bookId,
}: {
  book: Partial<IBook>;
  bookId: string;
}) => await axios.put(`${API_URL}/books/${bookId}`, book);

export const searchBooksAsync = async ({
  page,
  perPage,
  query,
}: {
  page: number;
  perPage: number;
  query: string;
}) =>
  await axios.get(`${API_URL}/books/search?q=${query}`, {
    params: { page, limit: perPage },
  });

export const removeBookAsync = async (bookId: string) =>
  await axios.delete(`${API_URL}/books/${bookId}`);

export const getBookByIdAsync = async (bookId: string) =>
  await axios.get(`${API_URL}/books/${bookId}`);
