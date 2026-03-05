# Ecoyaan Checkout Flow

A simplified checkout flow built for the Ecoyaan frontend engineering assignment. The app walks a user through three steps — reviewing their cart, entering a shipping address, and confirming payment — before landing on an order success screen.

---

## Live Demo

> [https://ecoyaan-test.vercel.app/cart](https://ecoyaan-test.vercel.app/cart) ← replace with your Vercel URL

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Form Handling | react-hook-form + zod |
| State Management | React Context API |
| Mock Backend | Next.js API Routes |

---

## Architectural Choices

### 1. Next.js App Router + Server Components (SSR)

The cart page (`/cart`) is a **React Server Component**. It fetches product data directly from the `/api/cart` mock route on the server before the page is sent to the browser. This satisfies the SSR requirement and means the user never sees a loading spinner for initial cart data.

```
app/(checkout)/cart/page.tsx     ← Server Component, fetches data
app/(checkout)/cart/CartClient.tsx  ← Client Component, renders UI
```

The Server Component passes the fetched data as props to `CartClient`, which hydrates the global Context on mount. This is the recommended App Router pattern for mixing SSR data with client-side interactivity.

### 2. Context API for Cross-Step State

Cart items, shipping fee, and the user's shipping address all need to persist across three separate route changes. A lightweight **Context + useState** setup (`CheckoutContext.tsx`) handles this cleanly without the overhead of Redux or Zustand, which would be overkill for a three-step linear flow.

```
context/CheckoutContext.tsx
  ├── cartItems
  ├── shippingFee
  └── shippingAddress
```

The provider wraps the entire app in `layout.tsx` so all checkout pages share the same state instance.

### 3. react-hook-form + zod for Form Validation

The shipping form uses **zod** to define a validation schema (email format, 10-digit phone, 6-digit PIN, all fields required) and **react-hook-form** to connect it to the UI with minimal re-renders. This keeps validation logic separate from the component and makes it easy to extend rules later.

### 4. Route Group `(checkout)`

All checkout screens live inside an `(checkout)` route group. This keeps the folder structure organised and allows a shared layout (e.g. the step indicator) to wrap all three screens without affecting the URL — the parentheses are invisible in the browser path.

### 5. Mock API via Next.js API Route

`/app/api/cart/route.ts` returns the mock cart JSON via a standard `GET` handler. Fetching from this endpoint (rather than importing the data directly) properly demonstrates an async SSR data-fetch pattern that mirrors how a real API integration would work.

---

## Folder Structure

```
ecoyaan-checkout/
├── app/
│   ├── api/
│   │   └── cart/
│   │       └── route.ts          # Mock cart API
│   ├── (checkout)/
│   │   ├── cart/
│   │   │   ├── page.tsx          # Server Component (SSR fetch)
│   │   │   └── CartClient.tsx    # Client Component (UI + context hydration)
│   │   ├── shipping/
│   │   │   └── page.tsx          # Shipping address form
│   │   ├── payment/
│   │   │   └── page.tsx          # Order confirmation + pay button
│   │   └── success/
│   │       └── page.tsx          # Order success screen
│   ├── layout.tsx                # Root layout with CheckoutProvider
│   └── globals.css
├── context/
│   └── CheckoutContext.tsx       # Global checkout state
├── components/
│   ├── CartItem.tsx              # Individual product card
│   ├── OrderSummary.tsx          # Subtotal / shipping / total sidebar
│   ├── ShippingForm.tsx          # Controlled form with zod validation
│   └── StepIndicator.tsx        # Cart → Shipping → Payment stepper
├── types/
│   └── index.ts                  # Shared TypeScript types
├── lib/
│   └── mockData.ts               # Static mock data reference
└── README.md
```

---

## Running Locally

### Prerequisites

- Node.js 18+
- npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/kekubhai/ecoyaan-test
cd ecoyaan-checkout

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# http://localhost:3000/cart
```

No environment variables are required. The mock API runs locally as a Next.js API route.

### Build for Production

```bash
npm run build
npm run start
```

---

## Checkout Flow

```
/cart  →  /shipping  →  /payment  →  /success
```

| Route | Description |
|---|---|
| `/cart` | SSR cart page — shows items, subtotal, and grand total |
| `/shipping` | Address form with live validation |
| `/payment` | Final summary + simulated payment (1.5s delay) |
| `/success` | Order confirmation screen |

---

## Trade-offs & Known Limitations

- **No persistence** — refreshing the page on `/shipping` or `/payment` clears the Context state. In production this would be solved with a session store or URL-encoded state.
- **No real payment gateway** — the pay button simulates a network call with a `setTimeout`. Integrating Razorpay or Stripe would be the natural next step.
- **Mock data is static** — the API route returns hardcoded JSON. A real implementation would query a database and support dynamic cart management (add, remove, update quantity).
- **No authentication** — a production checkout would require a logged-in user session before reaching the shipping step.