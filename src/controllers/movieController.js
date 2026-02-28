import { prisma } from "../config/db.js";

/**
 * Get all movies with optional query params for filtering by title, releaseYear, genre
 * and sorting by title or releaseYear
 *
 * Requires protect middleware
 */
const getMovie = async (req, res) => {
    const { title, releaseYear, genre, sortBy } = req.validatedQuery;

    const where = {};

    if (title) {
        where.title = {
            contains: title,
            mode: "insensitive",
        };
    }

    if (releaseYear) {
        where.releaseYear = releaseYear;
    }

    if (genre) {
        where.genres = {
            has: genre,
        };
    }

    const orderBy = {};

    if (sortBy === "title") {
        orderBy.title = "asc";
    } else if (sortBy === "releaseYear") {
        orderBy.releaseYear = "desc";
    }

    const movies = await prisma.movie.findMany({
        where,
        orderBy,
    });

    res.status(200).json({
        status: "success",
        data: { movies },
    });
};

/**
 * Add a new movie
 * Requires protect middleware
 */
const addMovie = async (req, res) => {
    const { title, overview, releaseYear, genres, runtime, posterUrl } = req.body;

    const movie = await prisma.movie.create({
        data: {
            createdBy: req.user.id,
            title,
            overview,
            releaseYear,
            genres,
            runtime,
            posterUrl,
        },
    });

    res.status(201).json({
        status: "success",
        data: { movie },
    });
};

/**
 * Get movie details by ID
 * Requires protect middleware
 */
const detailMovie = async (req, res) => {
    const movie = await prisma.movie.findUnique({
        where: { id: req.params.id },
        include: {
            creator: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({
        status: "success",
        data: { movie },
    });
};

/**
 * Update movie
 * Ensure only creator can update
 * Requires protect middleware
 */
const updateMovie = async (req, res) => {
    const { title, overview, releaseYear, genres, runtime, posterUrl } = req.body;

    const movie = await prisma.movie.findUnique({
        where: { id: req.params.id },
    });

    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }

    if (movie.createdBy !== req.user.id) {
        return res.status(403).json({ error: "You do not have permission to update this movie" });
    }

    // Build update data
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (overview !== undefined) updateData.overview = overview;
    if (releaseYear !== undefined) updateData.releaseYear = releaseYear;
    if (genres !== undefined) updateData.genres = genres;
    if (runtime !== undefined) updateData.runtime = runtime;
    if (posterUrl !== undefined) updateData.posterUrl = posterUrl;

    const updatedMovie = await prisma.movie.update({
        where: { id: req.params.id },
        data: updateData,
    });

    res.status(200).json({
        status: "success",
        data: {
            movie: updatedMovie,
        },
    });
};

/**
 * Delete movie
 * Ensure only creator can delete
 * Requires protect middleware
 */
const deleteMovie = async (req, res) => {
    const movie = await prisma.movie.findUnique({
        where: { id: req.params.id },
    });

    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }

    if (movie.createdBy !== req.user.id) {
        return res.status(403).json({ error: "You do not have permission to delete this movie" });
    }

    await prisma.movie.delete({
        where: { id: req.params.id },
    });

    res.status(200).json({
        status: "success",
        message: "Movie deleted",
    });
};

export { getMovie, addMovie, updateMovie, detailMovie, deleteMovie };
