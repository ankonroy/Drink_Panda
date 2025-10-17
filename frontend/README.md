# Drink Panda - Juice E-commerce (Frontend)

Simple, cool juice storefront built with Next.js App Router and minimal styling. Backend will be added later; for now it uses mock data and localStorage auth.

Features

- **Home**: product grid
- **Product details**: dynamic route `/product/[id]`
- **Auth**: register/login (dummy), role-based access
- **Profile**: protected page
- **Admin**: protected page (login with password `admin`)

Getting Started

- Install deps:
  ```bash
  npm install
  ```
- Run dev server:
  ```bash
  npm run dev
  ```
- Open `http://localhost:3000`

Auth Notes

- Auth is now connected to the backend API. The frontend will call the backend endpoints at `http://localhost:8000/api` by default.
- You can override the API base URL with the environment variable `NEXT_PUBLIC_API_URL` (for example, `NEXT_PUBLIC_API_URL=http://192.168.1.10:8000`).
- On successful login/register the frontend stores the user and access token in `localStorage` under `drinkpanda_auth`.

Backend requirements / notes

- The backend exposes `/api/register`, `/api/login`, `/api/logout` and `/api/user` (protected). These are implemented in the Laravel backend using Sanctum issuing personal access tokens.
- If you run the backend locally with `php artisan serve --port=8000` the frontend default should work. If you run backend elsewhere, set `NEXT_PUBLIC_API_URL` accordingly.
- If you see CORS or credential errors, verify backend CORS settings and ensure the backend allows requests from the frontend origin (typically `http://localhost:3000`).

Project Structure

- `src/app` - routes and layout
- `src/lib/products.ts` - mock products
- `src/lib/auth.ts` - minimal client-side auth

Images

- Add product images in `public/images/` with names: `apple.jpg`, `orange.jpg`, `mango.jpg`, `pineapple.jpg`. Temporary placeholders will show if missing.
