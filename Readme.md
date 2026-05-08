# Booking Service

A simple flight booking backend service built with Node.js, Express, Sequelize, and PostgreSQL.

## Project Overview

This service manages flight bookings and provides API endpoints for creating, reading, updating, and deleting booking records. It is designed as a backend microservice with a clear project structure, including models, controllers, services, repositories, migration files, and route definitions.

## Key Features

- RESTful API design for booking management
- Sequelize ORM for database models and migrations
- Organized controller/service/repository layers
- Configurable project settings via `src/config`

## Getting Started

1. Install dependencies:
   - `npm install`
2. Configure the database settings in `src/config/config.json`.
3. Run migrations to prepare the database.
4. Start the server:
   - to start server => `npm start`

## Development

- to update model by creating a new migration =>
  `npx sequelize migration:create --name modify-bookings_add_new_fields`

## Project Structure

- `src/index.js` - application entry point
- `src/config/` - configuration files
- `src/controllers/` - request handlers and controllers
- `src/models/` - Sequelize models
- `src/repository/` - data access layer
- `src/routes/` - API routing
- `src/services/` - business logic
- `src/utils/` - utility modules and error handling

## Notes

Keep the existing project commands and migration workflow as shown above when updating models or starting the service.