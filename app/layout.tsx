import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { Leaf } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CheckoutProvider>
            {/* Sticky Navbar */}
            <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-500" />
                    <span className="text-xl font-bold tracking-tight">
                      Ecoyaan
                    </span>
                  </div>
                  <ModeToggle />
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {children}
            </main>

            {/* Footer */}
            <footer className="bg-background border-t mt-auto">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Ecoyaan. All rights reserved.
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-500 font-medium flex items-center gap-2">
                    Sustainable choices for a better planet <span className="text-base">🌍</span>
                  </p>
                </div>
              </div>
            </footer>
          </CheckoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


