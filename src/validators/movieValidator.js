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

export { getMovieSchema };
