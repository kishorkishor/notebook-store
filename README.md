# Modern Notebook Store

![Build and Test](https://github.com/kishorkishor/notebook-store/actions/workflows/build-test.yml/badge.svg)

A fully responsive e-commerce website for selling notebooks, built with Next.js, TailwindCSS, and shadcn/ui.

## Features

- **Responsive Design:** Works on mobile, tablet, and desktop
- **Dark/Light Mode:** Toggle between themes with smooth transitions
- **Product Catalog:** Browse notebooks by category
- **Shopping Cart:** Add items, update quantities, and checkout
- **Authentication:** User login and signup functionality
- **Admin Panel:** Manage products, orders, and users

## Live Demo

Check out the live demo: [Notebook Store](https://your-netlify-url.netlify.app)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS & shadcn/ui components
- **State Management:** Zustand
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL (via Prisma)

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/notebook-store.git
   cd notebook-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in required values

4. Initialize the database:
   ```bash
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app`: Page components and route handlers
- `/components`: Reusable UI components
- `/lib`: Utility functions and data models
- `/prisma`: Database schema and client
- `/public`: Static assets
- `/store`: State management

## Customization

- Update product data in `/lib/data.ts`
- Modify colors and styling in `tailwind.config.js`
- Update site metadata in `/app/layout.tsx`

## Deployment

This project is deployed on Netlify.

## License

MIT
