import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SyncNotes - Your Notes, Perfectly Synced",
  description: "Experience the future of note-taking with SyncNotes. Organize, collaborate, and access your ideas from anywhere.",
  keywords: ["SyncNotes", "Note Taking", "Productivity", "Collaboration", "React", "Next.js"],
  authors: [{ name: "SyncNotes Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "SyncNotes",
    description: "Your Notes, Perfectly Synced",
    url: "https://syncnotes.com",
    siteName: "SyncNotes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SyncNotes",
    description: "Your Notes, Perfectly Synced",
  },
};

import { AuthProvider } from "@/components/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
