import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequestMiddleware.js";
import { validateQuery } from "../middleware/validateQueryMiddleware.js";
import { getWatchlistSchema, addToWatchlistSchema, updateWatchlistItemSchema } from "../validators/watchlistValidator.js";
import { getWatchlist, addToWatchlist, updateWatchlistItem, removeFromWatchlist } from "../controllers/watchlistController.js";

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /watchlist:
 *   get:
 *     summary: Get user's watchlist
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *           enum:
 *             - PLANNED
 *             - WATCHING
 *             - COMPLETED
 *         description: Filter by watchlist status
 *     responses:
 *       200:
 *         description: User's watchlist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WatchlistItem'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", validateQuery(getWatchlistSchema), getWatchlist);

/**
 * @swagger
 * /watchlist:
 *   post:
 *     summary: Add a movie to watchlist
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movieId
 *             properties:
 *               movieId:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the movie to add
 *               status:
 *                 type: string
 *                 enum:
 *                   - PLANNED
 *                   - WATCHING
 *                   - COMPLETED
 *                 default: PLANNED
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *                 description: User's rating - 1 to 10
 *               notes:
 *                 type: string
 *                 description: User's notes about the movie
 *     responses:
 *       201:
 *         description: Movie added to watchlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WatchlistItem'
 *       400:
 *         description: Validation error or movie already in watchlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Movie not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);

/**
 * @swagger
 * /watchlist/{id}:
 *   put:
 *     summary: Update a watchlist item
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Watchlist item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - PLANNED
 *                   - WATCHING
 *                   - COMPLETED
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Watchlist item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WatchlistItem'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Not your watchlist item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Watchlist item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", validateRequest(updateWatchlistItemSchema), updateWatchlistItem);

/**
 * @swagger
 * /watchlist/{id}:
 *   delete:
 *     summary: Remove a movie from watchlist
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Watchlist item ID
 *     responses:
 *       200:
 *         description: Movie removed from watchlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Not your watchlist item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Watchlist item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", removeFromWatchlist);

export default router;
