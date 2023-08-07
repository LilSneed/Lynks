## Getting Started

Prerequisites:

- MySQL local database or a Planetscale db
- npm

Setup

1. Clone repo
1. `npm install`
1. Create `.env` file if one does not already exist, There is an `.env.example` in the root directory you can use for reference
   `cp .env.example .env`.
1. Add Database connection URL to `.env`
1. Push the Prisma schema to your database - `npx prisma db push`
1. Get the clerk keys from [Clerk.com/dashboard]
1. Add them to `.env` as shown in `.env.example`
1. Run dev server `npm run dev`
