export interface IBook {
  title: string;
  description: string;
  author: string;
  publicationDate: Date;
  genre: string;
  price: number;
  color: string;
  _id: string;
}

export interface IBooksContext {
  addBook: (book: Partial<IBook>) => Promise<void>;
  books: IBook[];
  fetchBooks: (page: number, perPage: number) => Promise<void>;
  hasNextPage: boolean;
  isCache: boolean;
  isError: boolean;
  isLoading: boolean;
  page: number;
  perPage: number;
  removeBook: (bookId: string) => Promise<void>;
  searchBooks: (query: string, page: number, perPage: number) => Promise<void>;
  searchQuery: string;
  selectedBook: IBook | null;
  setHasNextPage: (hasNextPage: boolean) => void;
  setPage: (page: number) => void;
  setPerPage: (PerPage: number) => void;
  setSearchQuery: (query: string) => void;
  setSelectedBook: (book: IBook | null) => void;
  updateBook: (bookId: string, data: Partial<IBook>) => Promise<void>;
}
