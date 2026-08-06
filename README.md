# ShopSphere

A complete online shopping website — a mini Flipkart/Myntra. Two parts: a customer-facing storefront and an admin panel for the business team.

## For customers

- Sign in with Google (no manual account creation needed)
- Browse and search products by category, brand, price, and rating
- Open any product to see photos, color options, prices with discounts, and other customers' reviews (including an AI-generated summary)
- Add items to a bag, apply coupon codes and reward points at checkout, and pay online via Razorpay or Stripe, or cash on delivery
- Track order status right up to delivery, save favorites to a wishlist, and earn points on every purchase that can be redeemed later

## For the admin team

- Add, edit, and remove products; update stock/inventory
- View and manage customer orders and their statuses
- Dashboards with sales, revenue, top-selling products, and category performance charts
- Manage customers and store settings

## How it's built

- Modern web front-end (React), Node.js API + MongoDB database, Clerk for logins
- Real payments (Razorpay + Stripe)
- Hosted live: backend on Render, frontend deployable on Vercel

## Recent work

- Redesigned the entire customer-facing UI into a clean marketplace-style theme (pink brand), covering the home page, product listings, product details, cart, and footer, including mobile bottom navigation
- Modern look with a soft animated gradient background and micro-animations: scroll reveals, hover effects, page transitions, loading shimmer
- Fixed a bug where customers couldn't submit product reviews (submit either failed silently or the button stayed greyed out)

## Status

- The app builds and runs cleanly
- Backend has newer features (coupons, reward points, tracking statuses) that still need one re-deploy to the live server before they work in production

## Development

- Install: `npm install`
- Run frontend: `npm run dev`
- Build: `npm run build`
- Backend (separate repo): Express + MongoDB at `F:\MERN\node-js\18-api-creation`, default `http://localhost:5000`

See `PROJECT_CONTEXT.md` for a detailed technical brief.
