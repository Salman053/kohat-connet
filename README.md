# Kohat Connect

A hyperlocal city directory and community platform for **Kohat, Khyber Pakhtunkhwa, Pakistan**. Connects residents and visitors with local businesses, services, events, tourism, and community resources — all in one place.

> **Version:** 0.1.0 — Active Development

---

## Business Model

Kohat Connect operates as a **multi-sided platform** connecting local businesses, service providers, and the Kohat community.

### Revenue Streams

| Stream | Description | Pricing |
|--------|-------------|---------|
| **Ad Packages** | Businesses promote listings or run display ad campaigns | PKR 500–3,000 per campaign |
| **Premium Directory** | Featured/sponsored listings with priority placement | PKR 2,000 / 30 days |
| **Standard Media Ads** | Banner and sidebar ad placements | PKR 5,000–12,000 / month |
| **Sponsored Content** | Social media + newsletter promotion | PKR 8,500 / post |
| **Partnership Program** | Franchise, event sponsorship, and API partnerships | Custom |

**Payment methods accepted:** JazzCash, EasyPaisa, Bank Transfer, Cash Deposit (admin-verified manually).

Stripe integration is configured and ready for future automated payment processing.

### Free Services (User-Facing)

- Business directory listing (basic tier)
- Community forum and reviews
- Blood donor registry
- Tourism and events guide
- Blog publications
- Job board and real estate listings
- Contact and support forms

---

## User Types & Roles

| Role | Access | Key Capabilities |
|------|--------|-----------------|
| **Guest** | Public pages only | Browse listings, events, blogs, register |
| **User** | Public + reviews + community | Write reviews, create posts, register as blood donor |
| **Business** | Dashboard | Manage listings, book ads, view performance stats |
| **Admin** | Full admin panel | Manage users, listings, ads, payments, content, analytics, settings |

**Supporting roles** (defined in schema): `support`, `entry_operator`, `test`.

---

## Features by User Role

### Public (Guest)

- **Homepage** — Hero banner, emergency contacts, trending items, deals, promoted listings, shops grid, services, job board, community posts, real estate, blood donor callout
- **Explore** — Full-text search across all listings with category filter and grid/list toggles
- **Business Directory** (`/listings`) — Browse, search, filter by category with detailed business profiles including contact, hours, reviews, location
- **Categories** (`/categories`) — 7 main categories with 45 subcategories across Beauty & Wellness, Tourism, Local Business, Food & Dining, Events, Services, Community
- **Shops** (`/shops`) — Marketplace with detailed shop profiles and reviews
- **Services** (`/services`) — Professional services directory with instant booking form
- **Events** (`/events`) — Event listings with category tabs, search, detail pages
- **Blog** (`/blog`) — Articles with category filter and related posts
- **Tourism** — Places of interest in and around Kohat
- **Blood Donors** — Public directory with contact details
- **Forms** — Submit business listing requests, ad inquiries, partnership applications, contact/support tickets, career applications
- **Static Pages** — FAQ, Privacy Policy, Terms & Conditions, Cookie Policy, Sitemap

### Business (Dashboard)

- **Overview** — Stats dashboard (total/active listings, active ads, profile views, average rating)
- **My Listings** — CRUD management of own business listings
- **Add Listing** — Create listing with categories, images, contact info, map coordinates
- **My Ads** — View ad campaign performance (impressions, clicks)
- **Book Ad** — Select package → fill details → submit payment → admin approves → ad activates

### Admin (Admin Panel)

- **Dashboard** — Platform-wide stats (users, listings, active ads, pending reviews)
- **Users** — Manage all users, change roles, verify business accounts
- **Listings** — Approve/reject/feature/verify business listings
- **Advertisements** — Manage ad campaigns, approve/review
- **Payments** — Review manual payment submissions, approve/reject with reasons
- **Categories** — CRUD categories and subcategories
- **Content** — Blog, tourism places, events CRUD
- **Blood Donors** — Manage donor registry
- **Reports** — Review and resolve user-submitted reports
- **Analytics** — Platform usage and revenue analytics
- **Settings** — Platform configuration

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16.2.9 (App Router) |
| **Language** | TypeScript 5.x |
| **UI** | React 19.2.4, shadcn/ui (custom theme: "base-lyra") |
| **Styling** | Tailwind CSS v4, Framer Motion |
| **Icons** | Lucide React, Tabler Icons React |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth (SSR + client via `@supabase/ssr`) |
| **Testing** | Vitest v4, React Testing Library, jsdom |
| **Deployment** | Vercel (Analytics + Speed Insights) |
| **Fonts** | Geist Sans, Geist Mono, JetBrains Mono |

---

## Architecture

### Routing

Next.js App Router with four route groups:

```
app/
├── (public)/     # 20 public-facing pages (homepage, directory, blog, etc.)
├── admin/        # 13 admin panel sections
├── api/          # 6 REST API endpoints (listings, ads, payments, upload, etc.)
├── auth/         # signin, signup, forgot-password, signout
└── dashboard/    # business dashboard (overview, listings, ads)
```

### Data Flow

- **Primary data source:** Supabase PostgreSQL with Row-Level Security (RLS)
- **Auth flow:** Hybrid — server-side `proxy.ts` validates session via `getUser()` for initial redirects; client-side `AuthProvider` (React context) subscribes to `onAuthStateChange` for persistent session across navigations
- **Fallback pattern:** Most data functions attempt Supabase first, then fall back to hardcoded sample data (`lib/data-fallback.ts`) for resilience during development
- **Authorization:** Both server-side (proxy) and client-side (layout + context) checks

### Client Architecture

- `lib/supabase/client.ts` — Browser Supabase singleton (`createBrowserClient`)
- `lib/supabase/server.ts` — Server-side client with cookie handling (`createServerClient`)
- `lib/supabase/proxy.ts` — Middleware client for route protection (`updateSession`)
- `components/auth/auth-context.tsx` — React context providing `user`, `session`, `loading`, `signIn`, `signUp`, `signOut`
- `components/auth/private-route.tsx` — Route guard (loading spinner → authenticated render → redirect if no user)

---

## Database Schema

15 tables with full RLS, indexes, triggers, and seed data.

### Tables

| Table | Purpose |
|-------|---------|
| `profiles` | Extended user profiles with role (admin/business/user) |
| `categories` | Hierarchical categories with parent_id for subcategories |
| `listings` | Business directory listings with approval workflow |
| `reviews` | User reviews on listings (unique per listing+user) |
| `advertisements` | Ad campaigns with status lifecycle |
| `ad_packages` | Pricing packages (5 seeded plans) |
| `payments` | Payment records linked to profiles and ads |
| `community_posts` | Forum posts with approval workflow |
| `comments` | Comments on community posts |
| `blood_donors` | Blood donor registry |
| `activity_logs` | Admin audit trail |
| `blogs` | Blog articles |
| `tourism_places` | Tourist attractions |
| `events` | Event listings |
| `reports` | User content/behavior reports |

### Enums

`user_role`, `listing_status`, `ad_status`, `ad_type`, `payment_status`

### Auth Trigger

`on_auth_user_created` → `handle_new_user()` — auto-creates a profile row on user registration.

---

## API Routes

| Route | Methods | Purpose |
|-------|---------|---------|
| `/api/auth` | GET | Fetch categories |
| `/api/listings` | GET, POST | List/create listings |
| `/api/listings/[id]` | GET, PUT, DELETE | Single listing CRUD |
| `/api/advertisements` | GET, POST | List/create ads |
| `/api/advertisements/[id]` | GET, PUT, DELETE | Single ad CRUD |
| `/api/payments` | GET, POST | List/create payments |
| `/api/payments/[id]` | GET, PUT, DELETE | Single payment CRUD |
| `/api/upload` | POST | Upload images to Supabase Storage |
| `/api/categories` | GET | Fetch categories |

---

## Security

- **Row-Level Security (RLS)** enforced on all tables
- **Proxy (middleware)** protects `/admin/*`, `/dashboard/*`, `/business/*` routes — redirects unauthenticated to `/auth/signin`, non-admin to `/dashboard`
- **Admin role check** enforced both server-side (proxy DB query) and client-side (layout useEffect)
- **Service role key** used for admin-level database operations
- **Cache-Control: no-store** set on all protected routes to prevent CDN caching of authenticated content
- Session validation uses `getUser()` (server-validated, not just cookie-read) for route protection

---

## Third-Party Services

| Service | Status |
|---------|--------|
| **Supabase** — Auth, Database, Storage | Active |
| **Vercel Analytics** — Web analytics | Active |
| **Vercel Speed Insights** — Performance | Active |
| **Unsplash** — Stock images (fallback) | Referenced in sample data |
| **NewsAPI** — News feed | Configured |
| **Stripe** — Payment processing | Config ready, not yet active |
| **Google Translate** — Language switching | Mentioned in cookie policy |

---

## Categories

7 main categories with 45 subcategories:

1. **Beauty & Wellness** — Salons, Spas, Gyms, Clinics, Pharmacies, Dental, Opticians
2. **Tourism** — Hotels, Restaurants, Parks, Historical Sites, Transport, Guides
3. **Local Business** — Electronics, Furniture, Clothing, Grocery, Hardware, Auto, Stationery, Sports, Books
4. **Food & Dining** — Restaurants, Cafes, Bakeries, Fast Food, Desserts, Catering
5. **Events** — Weddings, Concerts, Sports, Exhibitions, Workshops, Festivals
6. **Services** — Plumbing, Electrical, Painting, Carpentry, Cleaning, Photography, Tutoring
7. **Community** — Jobs, Real Estate, Classifieds, Volunteering, Lost & Found

---

## Development

### Quick Start

```bash
npm install
npm run dev        # → http://localhost:3000
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm test` | Run test suite (Vitest) |
| `npm run test:watch` | Watch mode |
| `npm run lint` | ESLint |
| `npm run create-admin` | Bootstrap first admin user |

### Testing

- **Framework:** Vitest v4 + React Testing Library
- **Coverage:** 56 tests across 10 test files (auth, data, proxy, API routes, components)
- **Mocks:** Full Supabase mock client with 15+ table fixtures and query builder
- **Run:** `npm test`

### Deployment

Deployed on Vercel. Push to the connected Git repository to trigger automatic deployment.

---

## Contact

- **WhatsApp:** +92 3352313245
- **Email:** salmankhanm859@gmail.com
- **Team:** Kohat Connect Team
