import { FC, useState } from "react";
import { IBook } from "../../../types/contextInterfaces";
import "./BookItem.css";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

type BookItemProps = {
  book: IBook;
  onSelect: (book: IBook) => void;
  onDelete: (bookId: string) => void;
  onUpdate: (bookId: string, updatedData: Partial<IBook>) => void; // Add an onUpdate prop
};

const BookItem: FC<BookItemProps> = ({
  book,
  onSelect,
  onDelete,
  onUpdate,
}) => {
  const Theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBook, setUpdatedBook] = useState<Partial<IBook>>({
    title: book.title,
    description: book.description,
    author: book.author,
    publicationDate: book.publicationDate,
    genre: book.genre,
    price: book.price,
    color: book.color,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(book._id, updatedBook);
    setIsEditing(false);
  };

  return (
    <Card
      className="book-item"
      variant="outlined"
      style={{
        backgroundColor: book.color,
        color: Theme.palette.text.primary,
        borderRadius: "20px",
      }}
    >
      <CardContent className="book-content">
        <Typography variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography>{book.description}</Typography>
      </CardContent>
      <CardActions className="book-buttons">
        <Button size="small" onClick={() => onSelect(book)}>
          Select
        </Button>
        <Button size="small" onClick={handleEditClick}>
          Edit
        </Button>
        <Button size="small" onClick={() => onDelete(book._id)}>
          Delete
        </Button>
      </CardActions>

      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent className="edit-form">
          <TextField
            label="Title"
            fullWidth
            value={updatedBook.title || ""}
            onChange={(e) =>
              setUpdatedBook({ ...updatedBook, title: e.target.value })
            }
            style={{ margin: "5px 0 10px 0" }}
          />
          <TextField
            label="Description"
            fullWidth
            value={updatedBook.description || ""}
            onChange={(e) =>
              setUpdatedBook({ ...updatedBook, description: e.target.value })
            }
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleSaveClick}>Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default BookItem;
