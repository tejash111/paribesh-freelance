This project uses Next.js for both the frontend and backend.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Backend

- API routes live in `app/api`.
- Database connection lives in `lib/db.ts`.
- Mongoose models live in `lib/models`.
- Admin create/edit/delete flows run through Next server actions.

Primary endpoints:

```text
GET    /api
GET    /api/posts
POST   /api/posts
GET    /api/posts/:id
PATCH  /api/posts/:id
DELETE /api/posts/:id
```

`MONGODB_URI` is preferred, and `MONGO_URI` is also supported for compatibility with the old standalone server.

## Legacy Server Folder

The `server/` folder is still present for reference, but the active backend now runs from `client/`.
