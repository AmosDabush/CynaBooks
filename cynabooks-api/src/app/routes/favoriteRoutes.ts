import express from "express";
import * as bookController from "../controllers/bookController";

const router = express.Router();

router.get("/", bookController.getBooks);
router.post("/", bookController.addBook);
router.delete("/:id", bookController.removeBook);
router.put("/:id", bookController.updateBook);
router.get("/search", bookController.searchBooks);

export default router;
