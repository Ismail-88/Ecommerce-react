# ShopSphere — Full-Stack E-Commerce Platform (Project Prompt)

> Use this document as the complete prompt/spec to rebuild, understand, or extend the ShopSphere project.

---

## 1. Project Summary

ShopSphere is a **full-stack e-commerce platform** with two connected sides:

- **Customer Storefront** — browse, search, filter, add-to-cart, checkout, pay (Razorpay), track orders, earn rewards.
- **Admin Back-Office** — ERP-style dashboard to manage products, orders, inventory, categories, customers, and analytics.

Both sides consume the **same REST API and MongoDB database**, so data stays in sync in real time (e.g., an order placed by a customer instantly appears in admin; an admin status change instantly updates the customer's tracking timeline).

---

## 2. Tech Stack

### Frontend (`ShopSphere-Ecom-React` — React, deployed on Vercel)
| Area | Technology |
|---|---|
| Framework | React 19, Vite 7 (build) |
| Styling | Tailwind CSS 4 (design tokens + dark/light mode) |
| Routing | react-router-dom v7 |
| State | React Context (Cart, Wishlist, Theme, Data, Admin) |
| Customer Auth | Clerk (`@clerk/clerk-react`) |
| Admin Auth | Custom JWT (jsonwebtoken) |
| Forms | react-hook-form + zod validation |
| Charts | recharts (admin analytics) |
| Icons | lucide-react, react-icons, MUI icons |
| UI/Animations | MUI, slick-carousel, framer-motion, react-parallax-tilt, lottie-react, react-loading-skeleton |
| Alerts | react-toastify, react-hot-toast, sweetalert2 |
| HTTP | axios |
| Payments | Razorpay + Stripe SDKs |

### Backend (`node-js\18-api-creation` — Node + Express, deployed on Render)
| Area | Technology |
|---|---|
| Runtime | Node.js + Express 5 |
| Database | MongoDB + Mongoose 8 |
| Auth | jsonwebtoken, bcryptjs |
| Uploads | multer |
| Payments | razorpay |
| Other | cors, dotenv, slugify, nodemon (dev) |

### Infrastructure
- Frontend → **Vercel** (`https://ecommerce-reacts.vercel.app`)
- Backend → **Render** (`https://node-api-backend-9fpb.onrender.com`)
- Database → MongoDB (cloud, via `MONGO_URI` env)

---

## 3. Architecture & Data Flow

```
Customer (Clerk) ─┐
                  ├──► React Frontend (Vercel) ──► Express API (Render) ──► MongoDB
Admin (JWT) ──────┘                                  ▲
Customer checkout (Razorpay) ───────────────────────┘
```

- Frontend talks to the backend via `API_BASE_URL` (env `VITE_API_BASE_URL`, default `http://localhost:5000`).
- Two HTTP helpers exist: axios instance (`api`) and raw `fetch` with `API_BASE_URL` (kept consistent).
- Order data flows: **Storefront checkout → payment route → Order created → Admin orders list → status update → Customer tracking page**.

---

## 4. Data Models (Mongoose)

### Product — `model/products.js`
- `title`, `slug` (unique), `price`, `description`, `images[String]`, `category` (ref Category), `discount`, `brand`, `stock`, `colors[]` (color variants: `name`, `hex` `#RRGGBB`, `images[1..4]`).

### Category — `model/category.js`
- `name` (required), `slug` (required, unique), `image`, `description`, `isActive` (default true).

### User — `model/user.js`
- `name`, `email` (unique), `password` (only for admin/staff/superadmin, bcrypt-hashed), `clerkId` (unique, sparse), `role` (`user|admin|staff|superadmin`), `profileImage`, `phone`, `address`, `isActive`, `isEmailVerified`, `lastLogin`, `totalOrders`, `totalSpent`, `rewardPoints`, `totalPointsEarned`, `referralCode`, `referredBy`, `permissions` (`canManageProducts|canManageOrders|canManageUsers|canViewAnalytics`).
- Methods: `comparePassword`, `hasPermission`. Pre-save hook hashes passwords for admin roles only.

### Order — `model/orders.js`
- `userId` (Clerk id), `mongoUserId`, `orderId`, `orderDate`, `status` (`pending|processing|shipped|delivered|cancelled`), `items[]` (`title, price, quantity, images[]`), `shippingInfo` (name/email/phone/address/city/state/zip/country), `pricing` (`subtotal, deliveryFee, handlingFee, discount, grandTotal`), `couponCode`, `pointsUsed`, `pointsEarned`, `paymentMethod` (`razorpay|cod|stripe|paypal`), `paymentId`, `paymentStatus` (`pending|paid|failed`), `paidAt`.
- Pre-save hook lowercases `status`.

### Review — `model/review.js`
- `productId` (ref Product), `userId` (ref User), `rating` (1–5), `title` (≤100), `comment` (≥10, ≤1000), `images[String]`, `likes[]`, `verified`, `helpful`.
- Unique compound index `{ productId, userId }` → one review per user per product.

---

## 5. API Endpoints

### Admin (`/api/admin` prefix + root)
| Method & Path | Purpose |
|---|---|
| POST `/api/admin/register` | Create admin/staff/superadmin |
| POST `/api/admin/login` | Admin login → JWT token |
| GET `/api/admin/profile` | Admin profile (auth) |
| GET `/users`, GET `/users/stats` | List users / stats |
| GET `/products`, GET `/products/:id` | List / get product (populated category) |
| POST `/products` | Create product (multer: `images`, `colorImages`) |
| PUT `/products/:id` | Update product (guard `stock`/`price` with `!== undefined` so 0 works) |
| DELETE `/products/:id` | Delete product + its images |
| POST `/categories`, PUT `/categories/:id`, DELETE `/categories/:id` | Category CRUD |
| GET `/orders`, GET `/orders/:id` | List / get orders |
| PUT `/orders/:orderId` | Update order status |
| DELETE `/orders/:id` | Delete order |

### Storefront (user)
| Method & Path | Purpose |
|---|---|
| GET `/products`, GET `/products/:id` | Public product list / detail |
| GET `/categories`, GET `/categories/:slug` | Category list / products by category |
| POST `/api/users/sync` | Sync Clerk user into Mongo |
| GET `/users/clerk/:clerkId` | Get user by Clerk id |
| POST `/orders` | Place order |
| GET `/orders/user/:clerkId` | User's orders |
| GET `/order/:orderId` | Single order by orderId |
| POST `/api/payment/create-order` | Create Razorpay order |
| POST `/api/payment/verify` | Verify payment |
| POST `/api/payment/cod-order` | Cash-on-delivery order |
| GET `/api/payment/order-status/:orderId` | Payment status |
| GET `/api/coupons`, POST `/api/coupons`, PUT `/api/coupons/:id`, DELETE `/api/coupons/:id`, POST `/api/coupons/validate` | Coupons |
| GET `/api/users/:clerkId/rewards`, POST `/api/users/:clerkId/referral` | Rewards / referral |
| GET/POST `/api/products/:productId/reviews` | List / create reviews |
| GET `/api/products/:productId/reviews/rating/:rating` | Filter by rating |
| GET `/api/products/:productId/reviews/stats` | Avg + distribution |
| PUT/DELETE `/api/reviews/:reviewId` | Edit / delete own review |
| POST `/api/reviews/:reviewId/like` | Like/unlike review |
| GET `/api/products/:productId/reviews/check/:clerkId` | Has user reviewed? |
| GET `/api/users/:clerkId/reviews` | User's reviews |

---

## 6. Frontend Routes

### Storefront (`src/App.jsx` → `UserRoutes`)
| Path | Page | Access |
|---|---|---|
| `/` | Home | public |
| `/products`, `/products/:id`, `/product/:id` | Products / Product detail | public |
| `/category/:id` | Products by category | public |
| `/about`, `/contact` | Static pages | public |
| `/cart` | Cart | **protected (Clerk)** |
| `/checkout` | Checkout | **protected** |
| `/order-confirmation` | Post-payment confirmation | public (don't block) |
| `/track-order` | Track by order ID | public |
| `/my-orders` | My orders | **protected** |
| `/wishlist` | Wishlist | **protected** |
| `/rewards` | Rewards | **protected** |
| `/deals` | Deals | public |
| `/order/:orderId` | Order details | public |

### Admin (`src/App.jsx` → `/admin/*`)
| Path | Page |
|---|---|
| `/admin/login` | Admin login (no layout) |
| `/admin` / `/admin/dashboard` | Dashboard |
| `/admin/products` | Products list |
| `/admin/products/add` / `/admin/products/edit/:id` | Add / edit product |
| `/admin/orders` | Orders |
| `/admin/customers` | Customers |
| `/admin/analytics` | Analytics |
| `/admin/inventory` | Inventory |
| `/admin/category` | Categories |
| `/admin/settings` | Settings |

---

## 7. Authentication Model

- **Customers → Clerk** (`SignedIn/SignedOut`, `useUser`, `SignInButton` modal). A `ClerkUserSync` component syncs Clerk users to Mongo on login.
- **Protected routes**: `src/components/ProtectedRoute.jsx` uses `useAuth()` + `useClerk().openSignIn()` — opens the Clerk modal with `redirectUrl` back to the requested page; shows a spinner while `isLoaded`; returns to home if not signed in.
- **Admins → custom JWT**: `AdminLogin` posts to `/api/admin/login`, stores `adminToken` + `adminInfo` in localStorage; `AdminRoute` verifies via `/api/admin/profile`; roles `admin|staff|superadmin`, with per-permission checks for `staff`.
- Admin login demo credentials: `admin@example.com` / `admin123`.

---

## 8. Key Features

### Storefront
- Smart live search with product image suggestions.
- Product pages with image gallery, **color variants** (per-color images), discounts, quantity, trust badges, delivery info, related products.
- Reviews: star rating, title/comment (min 10 chars), optional image upload (base64), edit/delete own review, like/unlike, filter by rating, sort (recent/helpful/highest/lowest), AI-style review summary.
- Cart (persisted in localStorage), wishlist, coupon codes, reward points + referral.
- Checkout with address + **Razorpay test payments** + COD; order confirmation; live order tracking timeline.
- Dark/light theme, geolocation "Deliver to", mobile responsive with tab bar.

### Admin (ERP-style)
- Login: clean, flat, single-card ERP design (thin brand accent bar, solid brand button).
- Layout: sidebar grouped into **MAIN / CATALOG / SALES / INSIGHTS / SYSTEM** sections, gradient header strip.
- Dashboard: KPI cards (revenue, orders, low stock), charts (sales trend, weekly revenue, category pie), recent orders, top products — all brand palette.
- Orders table: gradient header, zebra rows, status management (updates customer tracking live).
- Products: card/table views, add/edit with **color variant uploads**, image management.
- Inventory: stock table with **NaN-safe stock value**, one-click stock update, low/out/in-stock filters.
- Categories: card grid, full CRUD (create/edit/delete), image handling (relative paths prefixed with `API_BASE_URL`, broken-image fallback).
- Customers: searchable table, role badges, details modal.
- Analytics: performance charts, category distribution.
- Settings: profile, permissions (role-based).

---

## 9. Design System & Conventions

- **Brand color:** pink `#FF3F6C` (Tailwind `brand-600`). Tailwind v4 tokens used everywhere; **no hardcoded hex in components** (exception: recharts chart series use brand/rose hexes).
- Admin charts palette: `#FF3F6C, #FB7185, #FF8AA7, #EC4899, #F43F5E, #E0285C`.
- Dark mode supported app-wide via `ThemeContext`.
- Currency formatting: `formatINR` util (`src/utils/formatCurrency.js`).
- Image URL resolution: relative paths (`/uploads/...`) must be prefixed with `API_BASE_URL`; always provide placeholder/`onError` fallbacks.
- Numeric safety: use `Number(x) * Number(y) || 0` style guards to avoid NaN in stock values/stats.
- Ignore backup files named `copy`, `old file user`, `new-old-files` (do not edit them).

---

## 10. Deployment

1. **Backend (Render):** push `node-js\18-api-creation` and redeploy so new routes (category PUT/DELETE, review PUT/POST/DELETE, stock updates) go live.
2. **Frontend (Vercel):** build with `VITE_API_BASE_URL=https://node-api-backend-9fpb.onrender.com` (default is `http://localhost:5000` — **must be overridden for production**).
3. **MongoDB:** connection string in backend `.env` (`MONGO_URI`); server logs `Mongo Connected` on success.
4. Local dev: `npm run dev` (frontend) + `node server.js` (backend, port 5000).

---

## 11. Build & Verify

```bash
# Frontend
npm install
npm run build        # expect: 2835 modules transformed, ~6–11s
npm run dev          # local dev on :5173

# Backend
cd node-js/18-api-creation
npm install
node server.js       # expect: "Port listening on 5000" + "Mongo Connected"
```

- Known non-blocking warning: single JS chunk >500 kB (fine for this project).
- Review/CRUD smoke test: `PUT /api/reviews/:id` and category routes must return JSON errors (not empty 404) on a current backend.

---

## 12. Demo Credentials & Test Cards

- Admin: `admin@example.com` / `admin123`
- Razorpay test card: `4111 1111 1111 1111`, any future expiry, any CVV, OTP `1234` (if asked).
