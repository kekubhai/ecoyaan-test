import Link from "next/link";

// Landing page to start the checkout flow
export default function Page() {
  return (
    <main className="min-h-screen bg-muted/40 flex items-center justify-center px-6 transition-colors duration-300">
      <div className="max-w-xl w-full bg-card rounded-2xl shadow-sm border border-border p-8 text-center space-y-6 transition-all duration-300 hover:shadow-md">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-wide text-accent-green font-semibold transition-colors duration-300">
            Eco-friendly store
          </p>
          <h1 className="text-3xl font-bold text-foreground transition-colors duration-300">Ready to check out?</h1>
          <p className="text-muted-foreground transition-colors duration-300">
            Review your cart, add your shipping details, and complete a secure payment in a few easy steps.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/cart"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent-green text-accent-green-foreground font-semibold hover:opacity-90 transition-all duration-300 active:scale-[0.98]"
          >
            Start Checkout
          </Link>
          <Link
            href="/cart"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-border bg-background text-foreground font-semibold hover:bg-accent transition-all duration-300 active:scale-[0.98]"
          >
            View Cart
          </Link>
        </div>
      </div>
    </main>
  );
}