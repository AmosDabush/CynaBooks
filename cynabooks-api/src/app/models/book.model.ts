import mongoose, { Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";
const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    enum: [
      "Science fiction",
      "Satire",
      "Drama",
      "Action",
      "Romance",
      "Mystery",
      "Horror",
    ],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;
