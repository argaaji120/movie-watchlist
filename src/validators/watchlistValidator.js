import { z } from "zod";

// movieId, status, rating, notes
const addToWatchlistSchema = z.object({
    movieId: z.uuid(),
    status: z.enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
        error: () => ({
            message: "Status must me one of: PLANNED, WATCHING, COMPLETED, DROPPED",
        }),
    }),
    rating: z.coerce.number().int("Rating must be an integer").min(1, "Rating must between 1 and 10").min(10, "Rating must between 1 and 10").optional(),
    notes: z.string().optional(),
});

// status, rating, notes
const updateWatchlistItemSchema = z.object({
    status: z.enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
        error: () => ({
            message: "Status must me one of: PLANNED, WATCHING, COMPLETED, DROPPED",
        }),
    }),
    rating: z.coerce.number().int("Rating must be an integer").min(1, "Rating must between 1 and 10").min(10, "Rating must between 1 and 10").optional(),
    notes: z.string().optional(),
});

export { addToWatchlistSchema, updateWatchlistItemSchema };
