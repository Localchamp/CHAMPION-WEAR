# Champion Wear

> **Dress Like a Champion. Live Like a Champion.**

A production-ready modern fashion e-commerce web application built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Supabase.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS, Framer Motion, Shadcn UI |
| Backend | Supabase (PostgreSQL, Auth, Storage, RLS) |
| Forms | React Hook Form + Zod |
| Testing | Jest + React Testing Library |
| Deployment | Vercel + GitHub Actions |
| Container | Docker + Docker Compose |

---

## Features

- 🛍️ Full e-commerce flow: Browse → Cart → Checkout → Order Tracking
- 🔐 Supabase Auth (Email/Password, Email Verification, Password Reset)
- 👑 Admin Dashboard with analytics, product/order/customer management
- 🎨 Dark/Light mode with premium black, white & gold brand identity
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Optimized performance (lazy loading, image optimization, caching)
- 🔒 Row Level Security (RLS) on all sensitive tables
- 🎭 Smooth animations with Framer Motion
- 🔍 Real-time search with debouncing
- ❤️ Wishlist with local + server sync
- 🏷️ Coupon/promo code system
- 📦 Multi-step checkout with order confirmation

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn
- Supabase account

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/champion-wear.git
cd champion-wear
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials in `.env.local`.

### 3. Database Setup

Run the SQL files in your Supabase SQL editor:

```bash
# 1. Run schema
supabase/database/schema.sql

# 2. Run seed data
supabase/database/seed.sql
```

### 4. Supabase Storage

Create two storage buckets in your Supabase dashboard:
- `product-images` (public)
- `profile-images` (public)

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Docker

```bash
# Production
docker-compose up app

# Development
docker-compose --profile dev up app-dev
```

---

## Testing

```bash
npm run test           # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
npm run type-check     # TypeScript check
```

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### GitHub Actions CI/CD

The `.github/workflows/ci-cd.yml` pipeline:
1. Runs tests & linting on every push
2. Builds the application
3. Deploys to Vercel on `main` branch
4. Builds & pushes Docker image

Required GitHub Secrets:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`

---

## Project Structure

```
champion-wear/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth pages (login, register)
│   ├── (shop)/            # Shop pages (shop, product, cart, checkout, wishlist)
│   ├── (dashboard)/       # User dashboard (profile, orders)
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/
│   ├── ui/                # Base UI components
│   ├── layout/            # Navbar, Footer, ThemeProvider
│   └── features/          # Feature-specific components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities, Supabase clients
├── services/              # Data fetching services
├── types/                 # TypeScript types
├── supabase/database/     # SQL schema & seed data
├── __tests__/             # Test files
├── docker/                # Docker configs
└── .github/workflows/     # CI/CD pipelines
```

---

## Admin Access

To make a user an admin, run in Supabase SQL editor:

```sql
UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';
```

---

## Brand Colors

| Color | Hex |
|-------|-----|
| Champion Black | `#0a0a0a` |
| Champion White | `#fafafa` |
| Champion Gold | `#d4af37` |
| Royal Blue | `#1e40af` |

---

## License

MIT © Champion Wear
