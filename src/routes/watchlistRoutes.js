import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequestMiddleware.js";
import { validateQuery } from "../middleware/validateQueryMiddleware.js";
import { getWatchlistSchema, addToWatchlistSchema, updateWatchlistItemSchema } from "../validators/watchlistValidator.js";
import { getWatchlist, addToWatchlist, updateWatchlistItem, removeFromWatchlist } from "../controllers/watchlistController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", validateQuery(getWatchlistSchema), getWatchlist);
router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);
router.put("/:id", validateRequest(updateWatchlistItemSchema), updateWatchlistItem);
router.delete("/:id", removeFromWatchlist);

export default router;
