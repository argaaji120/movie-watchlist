import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

config(); // Load environment variables from .env file
connectDB(); // Connect to the database

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// API Routes
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/watchlist", watchlistRoutes);

// Start the server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception:", err);
    await disconnectDB();
    process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});
