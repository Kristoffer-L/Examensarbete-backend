# Examensarbete-backend

This folder contains the Node/Express + TypeScript backend for the chess app.

## Prerequisites

- Node.js (v16 or later)
- MongoDB (local or hosted)

## Setup

1. Copy example env and set values:

```bash
cd backend
copy .env.example .env   # Windows
# or
cp .env.example .env     # macOS / Linux
```

2. Install dependencies and run in development:

```bash
npm install
npm run dev
```

Development runs with `tsx` (watch mode). The backend expects the following environment variables in `.env`:

```
MONGO_URI=your_mongo_connection_string
PORT=3000
JWT_SECRET=replace_with_a_secure_secret
```

## Build & Production

```bash
npm run build
npm start
```

## Notes

- API routes and socket handlers are in `src/`.
- If running MongoDB remotely, set `MONGO_URI` accordingly.
