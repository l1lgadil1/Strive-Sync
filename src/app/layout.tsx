import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StriveSync - Group Self-Development Challenge Platform",
  description: "Join challenges, track progress, and achieve your goals with friends and teammates.",
  keywords: ["self-development", "challenges", "goals", "productivity", "team challenges"],
  authors: [{ name: "StriveSync Team" }],
  creator: "StriveSync",
  metadataBase: new URL("https://strivesync.example.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://strivesync.example.com",
    title: "StriveSync - Group Self-Development Challenge Platform",
    description: "Join challenges, track progress, and achieve your goals with friends and teammates.",
    siteName: "StriveSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "StriveSync - Group Self-Development Challenge Platform",
    description: "Join challenges, track progress, and achieve your goals with friends and teammates.",
    creator: "@strivesync",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
