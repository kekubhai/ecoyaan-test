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
          disableTransitionOnChange={false}
        >
          <CheckoutProvider>
            {/* Sticky Navbar */}
            <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-colors duration-300">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <Leaf className="h-6 w-6 text-accent-green transition-colors duration-300" />
                    <span className="text-xl font-bold tracking-tight text-foreground transition-colors duration-300">
                      Ecoyaan
                    </span>
                  </div>
                  <ModeToggle />
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
              {children}
            </main>

            {/* Footer */}
            <footer className="bg-background border-t border-border mt-auto transition-colors duration-300">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Ecoyaan. All rights reserved.
                  </p>
                  <p className="text-sm text-accent-green font-medium flex items-center gap-2 transition-colors duration-300">
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


