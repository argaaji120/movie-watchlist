import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Movie Watchlist API",
            version: "1.0.0",
            description: "A Node.js Express backend API for managing movies and personal watchlists",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Error: {
                    type: "object",
                    properties: {
                        // message: { type: "string" },
                        // errors: { type: "array", items: { type: "object" } },
                        error: { type: "string" },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.js", "./src/swagger/definitions.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
