# nextjs-hono-tech-platform

This is a tech article sharing platform built with Next.js and Hono. It combines a fast frontend and lightweight backend, providing developers with an environment to post and share technical content.

## Tech Stack

* [Next.js](https://nextjs.org/)
* [Hono](https://hono.dev/)
* [Drizzle ORM](https://orm.drizzle.team/)
* [Tailwind CSS](https://tailwindcss.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vercel](https://vercel.com/)

## Directory Structure

```
.
├── src/                 # Application source code
├── public/              # Static assets
├── drizzle.config.ts    # Drizzle ORM configuration
├── .env.sample          # Environment variable sample
├── package.json         # Project dependencies
├── tailwind.config.ts   # Tailwind CSS configuration
└── ...
```

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/kishi1997/nextjs-hono-tech-platform.git
cd nextjs-hono-tech-platform
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Copy `.env.sample` to `.env` and update the values as needed.

```bash
cp .env.sample .env
```

### 4. Run database migrations

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

### 5. Start the development server

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` in your browser to see the app running.

