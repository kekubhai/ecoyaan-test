import Link from "next/link";

// Landing page to start the checkout flow
export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center space-y-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-wide text-green-600 font-semibold">
            Eco-friendly store
          </p>
          <h1 className="text-3xl font-bold text-gray-900">Ready to check out?</h1>
          <p className="text-gray-600">
            Review your cart, add your shipping details, and complete a secure payment in a few easy steps.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/cart"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
          >
            Start Checkout
          </Link>
          <Link
            href="/cart"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:border-gray-300 font-semibold transition-colors"
          >
            View Cart
          </Link>
        </div>
      </div>
    </main>
  );
}