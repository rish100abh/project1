# My Fullstack App

A production-style full-stack web application using:

- React + Vite
- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt password hashing

## Project structure

- `apps/client` → React frontend
- `apps/server` → Express backend
- `packages/db` → Prisma schema and database client
- `packages/shared` → shared types and schemas

## Prerequisites

- Node.js LTS
- npm
- Docker Desktop or local PostgreSQL

## Getting started

1. Copy `.env.example` to `.env`
2. Start PostgreSQL:
   ```bash
   docker compose up -d
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up client, server, and Prisma packages
5. Run the app:
   ```bash
   npm run dev
   ```

## Planned features

- User signup and login
- Protected routes
- JWT access and refresh tokens
- User profile
- CRUD for protected resources
- Secure backend validation