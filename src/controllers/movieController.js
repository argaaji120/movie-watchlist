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

const addMovie = async (req, res) => {
    res.status(200).json({
        status: "success",
        // data: { movies },
    });
};

const detailMovie = async (req, res) => {
    res.status(200).json({
        status: "success",
        // data: { movies },
    });
};

const updateMovie = async (req, res) => {
    res.status(200).json({
        status: "success",
        // data: {
        //     movie: updatedMovie,
        // },
    });
};

const deleteMovie = async (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Movie deleted",
    });
};

export { getMovie, addMovie, updateMovie, detailMovie, deleteMovie };
