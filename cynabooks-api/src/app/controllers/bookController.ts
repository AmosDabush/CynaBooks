import { Request, Response } from "express";
import { logger } from "../utils/logger";
import Book from "../models/book.model";
import { IBook } from "../interfaces/book.interface";

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number.isNaN(parseInt(req.query.page as string))
      ? 1
      : parseInt(req.query.page as string);
    const limit = Number.isNaN(parseInt(req.query.limit as string))
      ? 5
      : parseInt(req.query.limit as string);

    const total = await Book.countDocuments();
    const books = await Book.find()
      .skip((page - 1) * limit)
      .limit(limit);

    logger.info("Successfully fetched books");

    res.json({
      books,
      pageInfo: {
        currentPage: page,
        hasNextPage: page * limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching books:", error);

    logger.error("Error fetching books", { error });

    res.status(500).json({ error: "Error fetching books" });
  }
};

export const addBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookData: Omit<IBook, "_id"> = req.body;

    const existingBook = await Book.findOne({ title: bookData.title });

    if (existingBook) {
      res
        .status(400)
        .json({ error: "A book with the same title already exists" });
      return;
    }

    const newBook = new Book(bookData);
    const savedBook = await newBook.save();

    logger.info("Successfully added a book");

    res.status(201).json({
      message: "Book added",
      book: savedBook,
    });
  } catch (error) {
    console.error("Error adding book:", error);

    logger.error("Error adding book", { error });

    res.status(400).json({ error: "Error adding book" });
  }
};

export const removeBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const bookId = req.params.id;

  try {
    const existingBook = await Book.findById(bookId);

    if (!existingBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    await Book.deleteOne({ _id: bookId });

    logger.info("Successfully removed a book");

    res.json({ message: "Book removed" });
  } catch (error) {
    console.error(`Error removing book with id ${bookId}:`, error);

    logger.error("Error removing book", { error });

    res.status(500).json({ error: "Error removing book" });
  }
};

export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const bookId = req.params.id;
  const updatedBookData: Partial<IBook> = req.body;

  try {
    const existingBook = await Book.findById(bookId);

    if (!existingBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    const filter = { _id: bookId };
    const update = { $set: updatedBookData };

    await Book.updateOne(filter, update);

    const updatedBook = await Book.findById(bookId);

    logger.info("Successfully updated a book");

    res.status(200).json({
      message: "Book updated",
      book: updatedBook,
    });
  } catch (error) {
    console.error(`Error updating book with id ${bookId}:`, error);

    logger.error("Error updating book", { error });

    res.status(500).json({ error: "Error updating book" });
  }
};

export const searchBooks = async (
  req: Request & {
    query: {
      q?: string;
      page?: string;
      limit?: string;
    };
  },
  res: Response
): Promise<void> => {
  try {
    const q: string = req.query.q || "";
    const page: number = parseInt(req.query.page || "1", 10);
    const perPage: number = parseInt(req.query.limit || "10", 10);

    const searchQuery = {
      $or: [
        { title: { $regex: new RegExp(q, "i") } },
        { description: { $regex: new RegExp(q, "i") } },
        { author: { $regex: new RegExp(q, "i") } },
      ],
    };

    const skip = (page - 1) * perPage;

    const books = await Book.find(searchQuery).skip(skip).limit(perPage);

    const totalCount = await Book.countDocuments(searchQuery);

    const hasNextPage = skip + perPage < totalCount;

    logger.info(`Successfully searched for books with query: ${q}`);

    const response = {
      books,
      pageInfo: {
        hasNextPage,
        totalCount,
      },
    };

    res.json(response);
  } catch (error) {
    console.error("Error searching for books:", error);

    logger.error("Error searching for books", { error });

    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.params.id);
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    logger.info(`Successfully fetched book with ID: ${bookId}`);
    res.json(book);
  } catch (error) {
    console.error(`Error fetching book with ID: ${req.params.id}:`, error);
    logger.error(`Error fetching book with ID: ${req.params.id}`, { error });
    res
      .status(500)
      .json({ error: `Error fetching book with ID: ${req.params.id}:` });
  }
};
