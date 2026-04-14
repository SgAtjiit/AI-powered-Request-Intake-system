<<<<<<< HEAD
# AI-powered-intake request system
=======
# AI Workflow Engine

AI-powered-intake request system built for the QenixLabs full stack assessment. The app accepts user requests from a Next.js 14 frontend, stores them immediately through a NestJS API, and enriches each request asynchronously with OpenRouter-powered triage metadata.

## Features Implemented

- Next.js 14 App Router frontend with dedicated `/submit` and `/dashboard` routes
- NestJS backend with strict `ai` and `requests` module separation
- MongoDB + Mongoose request persistence with timestamps
- Fire-and-forget AI enrichment flow so `POST /requests` returns immediately
- OpenRouter integration isolated inside `AiService`
- DTO validation with `class-validator` and global `ValidationPipe`
- Dashboard category filtering via real API requests and URL search params
- Loading skeletons, empty state CTA, and error boundary for the dashboard
- Inline form validation, loading state, success banner, and error banner on submit
- Shared API helper layer in `client/lib/api.ts`

## Folder Structure

```text
root/
├── client/
├── server/
└── README.md
```

## Environment Variables

### `server/.env.example`

```env
MONGODB_URI=mongodb://localhost:27017/ai-workflow
OPENROUTER_API_KEY=your_key_here
PORT=3001
```

### `client/.env.example`

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Create these local files before running:

- `server/.env`
- `client/.env.local`

## Run Locally

### 1. Install dependencies

```bash
cd server
npm install
cd ../client
npm install
```

### 2. Configure environment files

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env.local
```

On Windows PowerShell, if `cp` is unavailable in your shell context:

```powershell
Copy-Item server/.env.example server/.env
Copy-Item client/.env.example client/.env.local
```

### 3. Start MongoDB

Run a local MongoDB instance on `mongodb://localhost:27017`.

### 4. Start the backend

```bash
cd server
npm run start:dev
```

The Nest API runs on [http://localhost:3001](http://localhost:3001).

### 5. Start the frontend

```bash
cd client
npm run dev
```

The Next app runs on [http://localhost:3000](http://localhost:3000).

## API Summary

### `POST /requests`

Creates a request immediately with `category`, `summary`, and `urgency` stored as `null`, then kicks off background AI enrichment.

### `GET /requests?page=1&limit=10&category=billing`

Returns paginated request data and optionally filters on category server-side.

## Verification Performed

- `server`: `npm run lint`
- `server`: `npm run build`
- `server`: `npx jest --config ./test/jest-e2e.json --runInBand`
- `client`: `npm run lint`
- `client`: `npm run build`

