import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { MotionProvider } from "@/components/chrome/MotionProvider";
import { brand } from "@/content/site";

/**
 * Fraunces carries the display type. Its optical size, softness and wonk
 * axes are what give the headings warmth instead of the cold neutrality
 * most screen serifs land on.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cdsstores.in"),
  title: {
    default: `${brand.short} · ${brand.name}`,
    template: `%s · ${brand.short}`,
  },
  description: brand.description,
  openGraph: {
    title: `${brand.short} · ${brand.name}`,
    description: brand.description,
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FDF8F2",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="grain antialiased">
        <MotionProvider>
          <SmoothScroll />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cocoa focus:px-5 focus:py-3 focus:text-sm focus:text-cream"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
