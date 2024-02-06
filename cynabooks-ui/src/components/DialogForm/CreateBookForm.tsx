import * as React from "react";
import { useRef, useState } from "react";
import {
  Button,
  DialogTitle,
  DialogActions,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SelectChangeEvent } from "@mui/material/Select";
import { useBooks } from "../../context/Context";
import ColorPicker from "../../partials/ColorPicker/ColorPicker";
import "./CreateBookForm.css";

const initialBook = {
  title: "",
  description: "",
  author: "",
  publicationDate: new Date(),
  genre: "",
  price: 0,
  color: "",
};

const CreateBookForm = ({ onClose }: { onClose: () => void }) => {
  const [book, setBook] = useState(initialBook);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);
  const btnRef = useRef(null);
  const { addBook } = useBooks();

  const handleChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name as string]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name as string]: "",
    }));
  };

  const handleSelect = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setBook((prevBook) => ({
      ...prevBook,
      genre: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      genre: "",
    }));
  };

  const handleColorChange = (newColor: string) => {
    setBook({ ...book, color: newColor });
  };
  const handleToggleColorPicker = () => {
    setColorPickerOpen(!isColorPickerOpen);
  };

  const validateForm = () => {
    const validationErrors: Record<string, string> = {};

    if (!book.title) {
      validationErrors.title = "Title is required";
    }
    if (!book.description) {
      validationErrors.description = "Description is required";
    }
    if (!book.author) {
      validationErrors.author = "Author is required";
    }
    if (!book.publicationDate) {
      validationErrors.publicationDate = "Publication Date is required";
    }
    if (!book.genre) {
      validationErrors.genre = "Genre is required";
    }
    if (!book.price) {
      validationErrors.price = "Price is required";
    }
    if (!book.color) {
      validationErrors.color = "Color is required";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      addBook(book);
      setBook(initialBook);
      onClose();
    }
  };

  return (
    <form className="form-container">
      <DialogTitle variant="h5">Add New Book</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <TextField
        label="Title"
        name="title"
        value={book.title}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        label="Description"
        name="description"
        value={book.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        required
        error={!!errors.description}
        helperText={errors.description}
      />
      <TextField
        label="Author"
        name="author"
        value={book.author}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.author}
        helperText={errors.author}
      />
      <TextField
        label="Publication Date"
        name="publicationDate"
        type="date"
        value={book.publicationDate}
        onChange={handleChange}
        fullWidth
        required
        InputLabelProps={{
          shrink: true,
        }}
        error={!!errors.publicationDate}
        helperText={errors.publicationDate}
      />
      <FormControl fullWidth required error={!!errors.genre}>
        <InputLabel>Genre</InputLabel>
        <Select name="genre" value={book.genre} onChange={handleSelect}>
          <MenuItem value="Science fiction">Science fiction</MenuItem>
          <MenuItem value="Horror">Horror</MenuItem>
          <MenuItem value="Drama">Drama</MenuItem>
          <MenuItem value="Action">Action</MenuItem>
          <MenuItem value="Romance">Romance</MenuItem>
          <MenuItem value="Mystery">Mystery</MenuItem>
        </Select>
        {errors.genre && <FormHelperText>{errors.genre}</FormHelperText>}
      </FormControl>
      <TextField
        label="Price"
        name="price"
        type="number"
        value={book.price}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.price}
        helperText={errors.price}
      />
      <TextField
        style={{ backgroundColor: book.color }}
        label="Color"
        name="color"
        value={book.color}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.color}
        helperText={errors.color}
      />
      <Button
        style={{ position: "absolute", bottom: 80, right: 50 }}
        ref={btnRef}
        onClick={handleToggleColorPicker}
      >
        Open Color Picker 🎨
      </Button>

      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Book
        </Button>
      </DialogActions>
      {isColorPickerOpen && (
        <ColorPicker
          customBg={book.color}
          handleColorChange={handleColorChange}
          handleClose={handleToggleColorPicker}
          toggleButtonRef={btnRef}
        />
      )}
    </form>
  );
};

export default CreateBookForm;
