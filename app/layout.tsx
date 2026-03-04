import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { Leaf } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecoyaan Checkout",
  description: "Sustainable choices for a better planet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 flex flex-col min-h-screen`}
      >
        <CheckoutProvider>
          {/* Sticky Navbar */}
          <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center h-16">
                <div className="flex-shrink-0 flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <span className="text-xl font-bold text-gray-800 tracking-tight">
                    Ecoyaan
                  </span>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-100 mt-auto">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} Ecoyaan. All rights reserved.
                </p>
                <p className="text-sm text-green-600 font-medium flex items-center gap-2">
                  Sustainable choices for a better planet <span className="text-base">🌍</span>
                </p>
              </div>
            </div>
          </footer>
        </CheckoutProvider>
      </body>
    </html>
  );
}

