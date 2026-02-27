import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateQuery } from "../middleware/validateQueryMiddleware.js";
import { getMovieSchema } from "../validators/movieValidator.js";
import { getMovie, addMovie, updateMovie, detailMovie, deleteMovie } from "../controllers/movieController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", validateQuery(getMovieSchema), getMovie);
router.post("/", addMovie);
router.get("/:id", detailMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
