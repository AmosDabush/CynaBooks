import express from "express";
import cors from "cors";
import connectToDatabase from "./configs/database";
import booksRoutes from "./routes/routes";

const app = express();
const PORT = process.env.PORT ?? 3000;

const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase();
    console.log("Connected to database");

    app.use(cors());
    app.use(express.json());
    app.get("/", (req, res) => {
      res.send("ROOT |  API is running");
    });

    app.use("/api/books", booksRoutes);

    app.listen(PORT, () => {
      console.log(`CynaBooks running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1); // Exit the process with an error code
  }
};

startServer().catch((error) => {
  console.error("Failed to start the server:", error);
});
