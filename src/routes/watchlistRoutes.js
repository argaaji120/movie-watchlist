import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequestMiddleware.js";
import { addToWatchlistSchema } from "../validators/watchlistValidator.js";
import { addToWatchlist, updateWatchlistItem, removeFromWatchlist } from "../controllers/watchlistController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);
router.put("/:id", updateWatchlistItem);
router.delete("/:id", removeFromWatchlist);

export default router;
