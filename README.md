

# AI-powered-intake request system


![Next.js 14](https://img.shields.io/badge/Next.js_14-App_Router-111111?style=for-the-badge&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-Backend-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-0F9D58?style=for-the-badge&logo=mongodb&logoColor=white)
![OpenRouter](https://img.shields.io/badge/OpenRouter-AI_Enrichment-6B46C1?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-End_to_End-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

Production Frontend: [https://ai-powered-request-intake-system.vercel.app](https://ai-powered-request-intake-system.vercel.app)  
Production Backend: [https://ai-powered-request-intake-system.onrender.com](https://ai-powered-request-intake-system.onrender.com)

## Overview

This project is a full stack AI-assisted request intake platform built for the QenixLabs assessment. A user submits a request from the frontend, the backend stores it immediately, and AI enrichment happens asynchronously in the background. That means the user gets a fast response without waiting for the model, while the dashboard updates later with category, urgency, and summary details.

The goal of the system is simple: make request submission feel instant, while still giving support or operations teams a cleaner, triaged view of incoming work.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 14, App Router, Tailwind CSS, React Hook Form |
| Backend | NestJS, TypeScript, Axios |
| Database | MongoDB, Mongoose |
| AI | OpenRouter |
| Validation | class-validator, class-transformer |
| Language | TypeScript throughout |
| Deployment | Vercel (frontend), Render (backend) |

## Core Features

- Dedicated request submission page at `/submit`
- Dedicated dashboard page at `/dashboard`
- Request storage in MongoDB with timestamps
- Asynchronous AI enrichment after save
- Server-side category filtering through query params
- Graceful handling of pending AI fields
- Loading skeletons, empty state, and error boundary on the dashboard
- Inline form validation with visible error feedback
- Centralized API helper layer on the frontend
- Clear backend separation between request logic and AI logic

## Product Workflow

This is the full workflow from the moment a user types a message to the moment the dashboard shows enriched metadata.

### 1. User submits a request

On the frontend, the user fills out:

- Name
- Email
- Message

The form uses `react-hook-form` for validation, so required-field and minimum-length errors are shown before the request is sent.

### 2. Frontend sends the request to the backend

The frontend calls the backend through the shared API helper in `client/lib/api.ts`.

Request sent:

```json
{
  "name": "Shrish Gupta",
  "email": "shrish@example.com",
  "message": "I am facing a billing issue with my recent order."
}
```

### 3. Backend stores the request immediately

The backend `POST /requests` endpoint validates the payload using NestJS DTO validation and stores the request in MongoDB right away.

At this point, the record is saved with AI fields still empty:

```json
{
  "name": "Shrish Gupta",
  "email": "shrish@example.com",
  "message": "I am facing a billing issue with my recent order.",
  "category": null,
  "summary": null,
  "urgency": null
}
```

This is intentional. The API does not wait for AI before responding.

### 4. AI enrichment runs in the background

After the document is saved, the backend triggers a fire-and-forget background task using `setImmediate(...)`.

That task sends the request content to OpenRouter and asks the model to return:

- `category`
- `summary`
- `urgency`

If the AI succeeds, the backend updates the same MongoDB record.

If the AI fails, the request still stays saved, and the system falls back safely instead of crashing the API flow.

### 5. Dashboard fetches requests from the backend

The dashboard uses server-side data fetching. It calls:

- `GET /requests`
- `GET /requests?category=billing`
- `GET /requests?category=support`
- and so on

This is important because filtering is done on the backend, not by filtering an already-loaded array on the client.

### 6. User sees enriched results

On the dashboard:

- If AI has finished, the user sees category, urgency, and summary
- If AI is still processing, the UI shows a processing state instead of `null`
- If no requests exist, the dashboard shows an empty state with a CTA
- If fetching fails, the dashboard shows a friendly retry path

## Architecture

### Frontend structure

The frontend lives inside `client/` and uses the Next.js 14 App Router.

Important routes:

- `client/app/submit/page.tsx`
- `client/app/dashboard/page.tsx`
- `client/app/dashboard/loading.tsx`
- `client/app/dashboard/error.tsx`

Important shared code:

- `client/lib/api.ts`
- `client/components/`

### Backend structure

The backend lives inside `server/` and uses strict NestJS modular organization.

Important backend modules:

- `server/src/requests/`
- `server/src/ai/`

Important files:

- `server/src/main.ts`
- `server/src/app.module.ts`
- `server/src/requests/requests.controller.ts`
- `server/src/requests/requests.service.ts`
- `server/src/requests/dto/create-request.dto.ts`
- `server/src/requests/schemas/request.schema.ts`
- `server/src/ai/ai.service.ts`

## API Reference

### `POST /requests`

Creates a request immediately and starts AI enrichment in the background.

Example response shape:

```json
{
  "_id": "661a00000000000000000001",
  "name": "Shrish Gupta",
  "email": "shrish@example.com",
  "message": "I am facing a billing issue with my recent order.",
  "category": null,
  "summary": null,
  "urgency": null,
  "createdAt": "2026-04-14T10:00:00.000Z",
  "updatedAt": "2026-04-14T10:00:00.000Z"
}
```

### `GET /requests?page=1&limit=10`

Returns paginated request data.

### `GET /requests?page=1&limit=10&category=billing`

Returns paginated request data filtered by category.

Example response shape:

```json
{
  "data": [],
  "total": 0,
  "page": 1,
  "limit": 10
}
```

## Environment Variables

### Backend: `server/.env`

```env
MONGODB_URI=mongodb://localhost:27017/ai-workflow
OPENROUTER_API_KEY=your_key_here
PORT=3001
FRONTEND_URL=https://ai-powered-request-intake-system.vercel.app
```

### Frontend: `client/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Local Development Setup

### 1. Install dependencies

```bash
cd server
npm install
cd ../client
npm install
```

### 2. Create local env files

```powershell
Copy-Item server/.env.example server/.env
Copy-Item client/.env.example client/.env.local
```

### 3. Start MongoDB

Make sure MongoDB is running locally on:

```text
mongodb://localhost:27017
```

### 4. Start the backend

```bash
cd server
npm run start:dev
```

Backend runs on:

```text
http://localhost:3001
```

### 5. Start the frontend

```bash
cd client
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

## Deployment Notes

### Frontend deployment

- Platform: Vercel
- Required env: `NEXT_PUBLIC_API_URL`
- Production URL: `https://ai-powered-request-intake-system.vercel.app`

### Backend deployment

- Platform: Render
- Root directory: `server`
- Build command: `npm install && npm run build`
- Start command: `npm run start:prod`
- Required envs:
  - `MONGODB_URI`
  - `OPENROUTER_API_KEY`
  - `FRONTEND_URL`

### CORS

The backend must allow the deployed frontend origin. `FRONTEND_URL` should be set to:

```env
FRONTEND_URL=https://ai-powered-request-intake-system.vercel.app
```

Do not add a trailing slash in the allowed origin value.

## Verification

The following checks were run during development:

- `server`: `npm run lint`
- `server`: `npm run build`
- `server`: `npx jest --config ./test/jest-e2e.json --runInBand`
- `client`: `npm run lint`
- `client`: `npm run build`

## Known Limitations and Trade-offs

- The dashboard currently loads the first page with a fixed limit of 10 records.
- AI enrichment depends on external model availability and OpenRouter response reliability.
- If OpenRouter fails or returns malformed output, the backend uses a safe fallback so request creation still succeeds.
- Full end-to-end production verification depends on a live MongoDB database and valid OpenRouter access at runtime.

## Why This Architecture Works Well

- The frontend stays responsive because submission does not wait for AI.
- The backend remains clean because AI logic is isolated inside `AiService`.
- The dashboard stays accurate because filtering happens through real API requests.
- The user experience stays stable because loading, empty, error, and processing states are all handled explicitly.

## Author Notes

This project was designed to reflect a production-minded approach rather than just a demo flow. The focus was on clean module boundaries, predictable async behavior, strong validation, and user-facing clarity at every state of the workflow.
