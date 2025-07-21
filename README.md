# OpenFGA Sample Project

This project demonstrates a modern e-commerce backend and frontend using Next.js, Prisma, Postgres, Tailwind CSS, and Radix UI, following OpenFGA coding standards.

## Features Implemented

- **Next.js** app with TypeScript, Tailwind CSS, and Radix UI.
- **Prisma** ORM for database interactions.
- **Postgres** as the primary database, managed via Docker Compose.
- **OpenFGA** server and Postgres infrastructure scripts in `infra/` for local development.
- **Prisma data model** for a simple e-commerce domain: Users, Orders, OrderItems.
- **Seed script** to populate the database with sample users, orders, and order items.
- **RESTful API** at `/api/orders` to fetch and create orders.
- **Frontend orders page** at `/orders` to view all orders and their items, with dark mode support.
- **Environment variables** managed via `.env` and `dotenv`.

## Getting Started

1. **Start infrastructure (Postgres & OpenFGA):**
   ```bash
   ./infra/start.sh
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run database migrations and seed data:**
   ```bash
   npx prisma migrate reset --force
   npx ts-node prisma/seed.ts
   ```
4. **Start the Next.js development server:**
   ```bash
   npm run dev
   ```
5. **View the app:**
   - Open [http://localhost:3000/orders](http://localhost:3000/orders) to see the orders UI.
   - API available at [http://localhost:3000/api/orders](http://localhost:3000/api/orders).

## Project Structure
- `infra/` - Docker Compose and scripts for infrastructure
- `prisma/` - Prisma schema and seed script
- `src/app/api/orders/` - RESTful API for orders
- `src/app/orders/` - Orders UI page

## Tech Stack
- Next.js, TypeScript, Tailwind CSS, Radix UI
- Prisma ORM
- Postgres (via Docker)
- OpenFGA (via Docker)

## Coding Standards
- Clear, descriptive naming
- Consistent formatting and indentation
- All new code in TypeScript

---

For more details, see the code and comments in each directory.
