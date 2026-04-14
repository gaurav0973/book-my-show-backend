# Book My Show Backend

A backend service for seat browsing and seat booking with JWT-based authentication, PostgreSQL, and Express.

## Overview

This project exposes two main modules:

- Authentication module for registering, logging in, refreshing tokens, logging out, and fetching the current user.
- Booking module for listing seats and booking a selected seat with transaction handling and route validation.

The application also serves a landing page at the root route for quick browser testing.

## Tech Stack

- Bun
- Express
- PostgreSQL
- TypeScript
- Zod
- JWT

## Project Flow

### Authentication Flow

1. Register a user with name, email, and password.
2. Login using email and password.
3. On successful login, the server returns an access token and stores a refresh token in an HTTP-only cookie.
4. Use the access token for protected routes.
5. Refresh the access token using the refresh token cookie when needed.
6. Logout clears the stored refresh token from the database and removes the cookie.

### Booking Flow

1. Fetch the seat list from the booking module.
2. Select a seat and send the seat id and name in the booking route.
3. The booking route is protected, so a valid access token is required.
4. The route params are validated before reaching the controller.
5. The service checks the seat state inside a transaction and updates the seat safely.

## Database Tables

The application expects these tables:

- users: id (auto-increment), name, email, password, refresh_token
- seats: id (auto-increment), name, is_booked

## Environment Variables

Create a .env file with values similar to the following:

    PORT=6000

    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=postgres
    DB_NAME=booking_db

    JWT_ACCESS_KEY_SECRET=ghaniya
    JWT_REFRESH_KEY_SECRET=dhaniya

## Setup

1. Install dependencies

   bun install

2. Start PostgreSQL using Docker

   bun run db:up

3. Run database migrations

   bun run db:migrate

4. Start the server

   bun run dev

5. Open the application in a browser

   http://localhost:6000/

## API Endpoints

### Auth Module

| Method | Endpoint                | Auth | Description                                 |
| ------ | ----------------------- | ---- | ------------------------------------------- |
| POST   | /api/auth/register      | No   | Register a new user                         |
| POST   | /api/auth/login         | No   | Login and receive access token              |
| POST   | /api/auth/refresh-token | No   | Refresh access token using cookie           |
| POST   | /api/auth/logout        | Yes  | Logout current user and clear refresh token |
| GET    | /api/auth/me            | Yes  | Fetch current authenticated user            |

### Booking Module

| Method | Endpoint               | Auth | Description                                   |
| ------ | ---------------------- | ---- | --------------------------------------------- |
| GET    | /api/booking/seats     | No   | List all seats                                |
| PUT    | /api/booking/:id/:name | Yes  | Book a seat using seat id and name in the URL |

## Response Format

Most endpoints return a consistent JSON response shape:

    {
      "success": true,
      "message": "...",
      "data": ...
    }
