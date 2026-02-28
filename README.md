**Disclaimer:** This is an independent learning project based on a tutorial by [Pedro Tech](https://youtu.be/g09PoiCob4Y?si=WxnTWkD92tCydGG7).

# Movie Watchlist Backend API

A Node.js Express backend API for managing movies and personal watchlists. Users can create accounts, manage movies, and track their watching progress with ratings and notes.

## Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Movie Management**: Create and manage movie entries with details like title, overview, release year, genres, and posters
- **Watchlist Management**: Add movies to personal watchlists with status tracking (PLANNED, WATCHING, COMPLETED), ratings, and notes
- **PostgreSQL Database**: Reliable data persistence with Prisma ORM
- **Error Handling**: Comprehensive error handling and graceful shutdown

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Management**: dotenv

## Project Structure

```
src/
├── server.js                           # Main application entry point
├── config/
│   └── db.js                           # Database configuration
├── controllers/
│   ├── authController.js               # Authentication logic
│   ├── movieController.js              # Movie management logic
│   └── watchlistController.js          # Watchlist management logic
├── middleware/
│   ├── authMiddleware.js               # JWT verification
│   ├── validateQueryMiddleware.js      # Query parameter validation
│   └── validateRequestMiddleware.js    # Request body validation
├── routes/
│   ├── authRoutes.js                   # Auth endpoints
│   ├── movieRoutes.js                  # Movie endpoints
│   └── watchlistRoutes.js              # Watchlist endpoints
├── utils/
│   └── generateToken.js                # JWT token generation
└── validators/
    ├── authValidator.js                # Auth request validation
    ├── movieValidator.js               # Movie request validation
    └── watchlistValidator.js           # Watchlist request validation
```

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/argaaji120/movie-watchlist.git

# Navigate to the project directory
cd backend_course

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/database_name"

# Server
PORT=3000

# JWT
JWT_SECRET="your_jwt_secret_key_here"
JWT_EXPIRE="7d"
```

Replace the placeholder values with your actual database credentials and secrets.

### 3. Setup Prisma

#### Initialize Prisma Client

Prisma Client is generated based on the schema. To generate it:

```bash
npx prisma generate
```

#### Run Database Migrations

Apply all pending migrations to your database:

```bash
npx prisma migrate dev
```

This command will:

1. Check for schema drift
2. Apply new migrations
3. Update the `_prisma_migrations` table
4. Generate Prisma Client artifacts

#### Seed the Database (Optional)

To populate the database with initial data:

```bash
npm run seed:movies
```

### 4. Run the Application

Start the development server:

```bash
npm run dev
```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Movies

- `GET /movies` - Get all movies
- `POST /movies` - Create a new movie
- `GET /movies/:id` - Get movie details
- `PUT /movies/:id` - Update movie
- `DELETE /movies/:id` - Delete movie

### Watchlist

- `GET /watchlist` - Get user's watchlist
- `POST /watchlist` - Add movie to watchlist
- `PUT /watchlist/:id` - Update watchlist item
- `DELETE /watchlist/:id` - Remove from watchlist

## Database Schema

### User

- `id` - UUID primary key
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp
- Relations: movies (created), watchlistItems

### Movie

- `id` - UUID primary key
- `title` - Movie title
- `overview` - Movie description
- `releaseYear` - Release year
- `genres` - Array of genre strings
- `runtime` - Duration in minutes
- `posterUrl` - URL to poster image
- `createdBy` - Creator user ID
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp
- Relations: creator (User), watchlistItems

### WatchlistItem

- `id` - UUID primary key
- `userId` - User ID (foreign key)
- `movieId` - Movie ID (foreign key)
- `status` - Watchlist status (PLANNED, WATCHING, COMPLETED)
- `rating` - User's rating (1-10)
- `notes` - User's notes about the movie
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp
- Unique constraint on (userId, movieId)
