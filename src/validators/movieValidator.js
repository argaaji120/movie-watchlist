import { z } from "zod";

// title, releaseYear, sortBy
const getMovieSchema = z.object({
    title: z.string().optional(),
    releaseYear: z.coerce.number().int().optional(),
    genre: z.string().optional(),
    sortBy: z
        .enum(["releaseYear", "title"], {
            error: () => ({
                message: "Sort must me one of: createdAt, rating",
            }),
        })
        .optional(),
});

// title, overview, releaseYear, genres, runtime, posterUrl
const addMovieSchema = z.object({
    title: z.string().min(1, "Title is required"),
    overview: z.string().min(1, "Overview is required"),
    releaseYear: z.coerce.number().int().min(1888, "Release year must be a valid year"),
    genres: z.array(z.string()).min(1, "At least one genre is required"),
    runtime: z.coerce.number().int().min(1, "Runtime must be a positive integer"),
    posterUrl: z.url("Poster URL must be a valid URL").optional(),
});

const updateMovieSchema = addMovieSchema;

export { getMovieSchema, addMovieSchema, updateMovieSchema };
