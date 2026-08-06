# PROJECT: ShopSphere

Full-stack MERN e-commerce marketplace (electronics, fashion, beauty, home & lifestyle).

## Stack

- Frontend: React 19 + Vite 7 + Tailwind CSS v4 + React Router 7, Clerk auth, react-hook-form + zod, axios, lucide-react, recharts, Razorpay + Stripe.
- Backend (separate repo): Express + MongoDB/Mongoose at `F:\MERN\node-js\18-api-creation`. Live API: `https://node-api-backend-9fpb.onrender.com` (redeploy to Render after backend edits).
- Frontend deployable on Vercel (`vercel.json` present). Build = `npm run build` (~7s, green; the >500kB chunk-size warning is pre-existing/expected). Dev: `npm run dev`; backend default `http://localhost:5000` (`VITE_API_BASE_URL` overrides).

## Architecture

- `src/App.jsx`: BackgroundDecor -> BrowserRouter -> Navbar + UserRoutes (keyed page-transition wrapper) + Footer + mobile tab spacer + LiveChatWidget. Admin uses AdminLayout.
- Contexts: DataContext (products/categories/orders + axios `api` + API_BASE_URL), CartContext, WishlistContext, ThemeContext (dark mode).
- UI kit: `src/components/ui` (Button, Card, Modal, Badge, Input, Select, Textarea, Skeleton, Spinner, EmptyState, PageHeader, SectionHeading, Reveal, ConfirmDialog).
- Design system: `src/index.css` — Tailwind v4 `@theme` + semantic tokens for light/dark. Brand pink `#ff3f6c`. Body has an ambient animated gradient; cards use `bg-surface` for readability. Utilities: `.text-gradient`, `.card-lift`, `.reveal`, `.skeleton-shimmer`, `.no-scrollbar`.

## User Features

- Home: CategoryRibbon, BannerCarousel (autoplay, animated content), ProductRail (Featured + Deals), TrustStrip, HomeAnimations.
- `/products`: sidebar filters (category/brand/price/rating), pills, sort + grid/list toggle, staggered grid, pagination.
- `/products/:id`: gallery, ColorSelector, QuantitySelector, PriceCard, PurchasePanel (Add to Bag / Buy Now + delivery estimate), DeliveryInfo, TrustBadges, Description, RelatedProducts, RecentlyViewed, full Reviews (list/filter/sort/like/edit/delete, WriteReviewModal, RatingOverview, AIReviewSummary via `utils/aiEngine.js`).
- `/cart`: qty steppers, "Price Details" summary, savings line, Place Order.
- Checkout: shipping form, DiscountPanel (coupons + reward points), payments (Razorpay/COD/Stripe), OrderSummary; hooks useCheckout/useDiscounts/useRazorpay.
- Orders: confirmation, My Orders, Order Details, Order Tracking (timeline + search).
- Extras: `/deals` + LiveCountdownTimer, Wishlist, Rewards & Referrals, About, Contact, SmartSearch, geolocation delivery estimate, MobileTabBar, dark mode.

## Admin (`/admin`, AdminRoute + separate AdminLogin)

Dashboard with charts, Products CRUD, Orders, Customers, Analytics, Inventory, Categories, Settings.

## Data Model

- products, categories, users (synced from Clerk), orders, reviews (unique per user+product, likes/images/verified), coupons, reward points, tracking statuses.

## Conventions

- Tailwind tokens only, no hardcoded hex in components; flat design (rounded-lg/xl, green `bg-success` rating chips, price + strikethrough + green % off).
- No comments unless asked; match existing style. Use Reveal / animate-fade-in-up / card-lift / skeleton-shimmer for motion. Verify with `npm run build`.
- Prefer editing existing files; never create docs unless asked.
- Backend changes need a Render redeploy.

## Gotchas

- `api` in DataContext is an axios instance, NOT a string — never use it inside `fetch()` (use `API_BASE_URL`).
- Deals page must call `fetchAllProducts()` once on mount (ref-guarded).
- Ignore files/folders named `copy`, `old file user`, `new-old-files` (backups/dead code).
- Admin styling is intentionally legacy/different from the user theme.
