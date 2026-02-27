import { prisma } from "../config/db.js";

/**
 * Get watchlist items for the authenticated user
 * Requires protect middleware
 * Optional query params for filtering by status (PLANNED, WATCHING, COMPLETED, DROPPED) and sorting by createdAt or rating
 */
const getWatchlist = async (req, res) => {
    const { status, sortBy } = req.validatedQuery;

    const hasWatchlistItems = await prisma.watchlistItem.findFirst({
        where: { userId: req.user.id },
    });

    if (!hasWatchlistItems) {
        return res.status(404).json({ error: "No watchlist items found for this user" });
    }

    const where = { userId: req.user.id };

    if (status) {
        where.status = status.toUpperCase();
    }

    const orderBy = {};

    if (sortBy === "createdAt") {
        orderBy.createdAt = "desc";
    } else if (sortBy === "rating") {
        orderBy.rating = "desc";
    }

    const watchlistItems = await prisma.watchlistItem.findMany({
        where,
        orderBy,
        include: {
            movie: {
                select: {
                    id: true,
                    title: true,
                    releaseYear: true,
                    posterUrl: true,
                },
            },
        },
    });

    res.status(200).json({
        status: "success",
        data: { watchlistItems },
    });
};

/**
 * Add movie to watchlist
 * Validate movie exists
 * Requires protect middleware
 */
const addToWatchlist = async (req, res) => {
    const { movieId, status, rating, notes } = req.body;

    // Verify movie is exists
    const movie = await prisma.movie.findUnique({
        where: { id: movieId },
    });

    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }

    // const existingInWatchlist = await prisma.watchlistItem.findUnique({
    //     where: {
    //         userId_movieId: {
    //             userId: req.user.id,
    //             movieId: movieId,
    //         },
    //     },
    // });

    const existingInWatchlist = await prisma.watchlistItem.findFirst({
        where: {
            userId: req.user.id,
            movieId: movieId,
        },
    });

    if (existingInWatchlist) {
        return res.status(400).json({ error: "Movie already in watchlist" });
    }

    const watchlistItem = await prisma.watchlistItem.create({
        data: {
            userId: req.user.id,
            movieId,
            status: status || "PLANNED",
            rating,
            notes,
        },
    });

    res.status(201).json({
        status: "success",
        data: { watchlistItem },
    });
};

/**
 * Update watchlist item
 * Ensure only owner can update
 * Requires protect middleware
 */
const updateWatchlistItem = async (req, res) => {
    const { status, rating, notes } = req.body;

    // Find watchlist item
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: { id: req.params.id },
    });

    if (!watchlistItem) {
        return res.status(404).json({ error: "Watchlist item not found" });
    }

    // Ensure onlu owner can update
    if (watchlistItem.userId !== req.user.id) {
        return res.status(403).json({ error: "Not allowed to update this watchlist item" });
    }

    // Build update data
    const updateData = {};

    if (status !== undefined) updateData.status = status.toUpperCase();
    if (rating !== undefined) updateData.rating = rating;
    if (notes !== undefined) updateData.notes = notes;

    // Update watchlist item
    const updatedItem = await prisma.watchlistItem.update({
        where: { id: req.params.id },
        data: updateData,
    });

    res.status(200).json({
        status: "success",
        data: {
            watchlistItem: updatedItem,
        },
    });
};

/**
 * Remove watchlist item
 * Ensure only owner can delete
 * Requires protect middleware
 */
const removeFromWatchlist = async (req, res) => {
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: { id: req.params.id },
    });

    if (!watchlistItem) {
        return res.status(404).json({ error: "Watchlist item not found" });
    }

    if (watchlistItem.userId !== req.user.id) {
        return res.status(403).json({ error: "Not allowed to remove this watchlist item" });
    }

    await prisma.watchlistItem.delete({
        where: { id: req.params.id },
    });

    res.status(200).json({
        status: "success",
        message: "Movie removed from the watchlist",
    });
};

export { getWatchlist, addToWatchlist, updateWatchlistItem, removeFromWatchlist };
