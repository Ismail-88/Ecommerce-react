# ShopSphere — Project Explanation by Flow

## 1. Sign-up / Login flow
Customer clicks **Sign In** → Google account login (via Clerk, no manual passwords) → their details are automatically created in our database. A customer account is required before ordering, but browsing, searching, and viewing products is open to everyone.

## 2. Browse & search flow
Customer lands on the **Home page** → sees a rotating banner, category shortcuts, and "Featured Picks" / "Deals of the Day" product rails. They can:
- Click a category to see all products in it
- Use filters (category, brand, price range, rating)
- Sort (price low-to-high, newest, popularity) and switch between grid/list view
- Use the smart search bar to find products by name
Pagination loads products in pages so the page stays fast.

## 3. Product details flow
Customer opens any product → sees a photo gallery, color options, quantity selector, price with discount % and "you save ₹X" info. They also see:
- Expected delivery estimate (based on their location)
- Trust badges (genuine product, secure payment, returns)
- Full description
- **Reviews section** — star ratings breakdown, customer reviews (filter by rating, sort, like, edit/delete own), an AI-generated summary of all reviews, and a "Write a Review" form
- Related products + recently-viewed items to keep them shopping

## 4. Cart flow
Customer adds items to the bag → the **Cart page** shows each item with quantity controls, a summary panel ("Price Details") showing: item total → delivery charges (free above a threshold) → coupon discount → **total payable**, plus "You will save ₹X". They can remove items or proceed to checkout.

## 5. Checkout & payment flow
Cart → **Checkout** in three steps:
1. **Address** — enter/confirm shipping address
2. **Discounts** — apply a coupon code and/or redeem reward points to lower the bill
3. **Payment** — choose **Razorpay** (UPI/cards/netbanking), **Stripe**, or **Cash on Delivery**
Payment happens securely on the payment gateway. A **confirmation page** shows the order number and summary immediately after success.

## 6. Order tracking flow
Every order gets a status timeline. Customer opens **My Orders** → selects an order → **Order Details** shows items and total. The **Track Order** page shows a visual timeline: Order Placed → Packed → Shipped → Out for Delivery → Delivered, and they can also look up an order by its tracking ID.

## 7. Rewards & wishlist flow
Customers earn **reward points** on every purchase and can redeem them at checkout. A **Rewards & Referrals** page shows their points balance and referral program. The **Wishlist** lets them save items to a list and move them into the bag later.

## 8. Admin flows (business side)
- **Login** — separate admin login (restricted, role-protected)
- **Products** — add/edit/remove products (name, photos, price, stock, category)
- **Inventory** — see stock levels, low-stock warnings, update quantity
- **Orders** — view all orders, change order status (which updates the customer's tracking)
- **Customers** — view customer list and details
- **Analytics / Dashboard** — charts for revenue, sales trend, top products, category performance
- **Categories & Settings** — manage categories and store configuration

## 9. Tech flow (in plain terms)
Browser (React app) → calls our Node.js API → reads/writes MongoDB database → payment gateways (Razorpay/Stripe) handle money → Clerk handles logins. The app is hosted live: API on Render, website deployable on Vercel.

## Current status note
The app builds and runs cleanly. The backend has newer features (coupons, reward points, tracking statuses) that need one re-deploy to the live server before they work in production.
