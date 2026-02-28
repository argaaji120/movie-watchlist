import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL }, { schema: "movies" });

const prisma = new PrismaClient({ adapter: adapter }, { log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"] });

const userId = "95aa7f75-f8c9-4ffa-aa3f-17f75c8c8eb5";

const movies = [
    {
        title: "Inception",
        overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        releaseYear: 2010,
        genres: ["Action", "Adventure", "Sci-Fi"],
        runtime: 148,
        posterUrl: "https://picsum.photos/200/300",
        createdBy: userId,
    },
    {
        title: "The Dark Knight",
        overview:
            "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        releaseYear: 2008,
        genres: ["Action", "Crime", "Drama"],
        runtime: 152,
        posterUrl: "https://picsum.photos/200/300",
        createdBy: userId,
    },
    {
        title: "Interstellar",
        overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        releaseYear: 2014,
        genres: ["Adventure", "Drama", "Sci-Fi"],
        runtime: 169,
        posterUrl: "https://picsum.photos/200/300",
        createdBy: userId,
    },
    {
        title: "The Matrix",
        overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        releaseYear: 1999,
        genres: ["Action", "Sci-Fi"],
        runtime: 136,
        posterUrl: "https://picsum.photos/200/300",
        createdBy: userId,
    },
    {
        title: "Pulp Fiction",
        overview: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        releaseYear: 1994,
        genres: ["Crime", "Drama"],
        runtime: 154,
        posterUrl: "https://picsum.photos/200/300",
        createdBy: userId,
    },
    {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        overview: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
        releaseYear: 2001,
        genres: ["Adventure", "Drama", "Fantasy"],
        runtime: 178,
        posterUrl: "https://picsum.photos/200/300",
        createdBy: userId,
    },
    {
        title: "The Shawshank Redemption",
        overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        releaseYear: 1994,
        genres: ["Drama"],
        runtime: 142,
        posterUrl: "https://picsum.photos/200/300",
        createdBy: userId,
    },
    {
        title: "The Godfather",
        overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        releaseYear: 1972,
        genres: ["Crime", "Drama"],
        runtime: 175,
        posterUrl: "https://picsum.photos/200/300",
        createdBy: userId,
    },
];

const main = async () => {
    console.log("Seeding movies...");

    for (const movie of movies) {
        await prisma.movie.create({
            data: movie,
        });

        console.log(`Created movie: ${movie.title}`);
    }

    console.log("Seeding completed.");
};

main()
    .catch((e) => {
        console.error("Error seeding data:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
