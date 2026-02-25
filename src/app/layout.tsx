import type { Metadata } from "next";
import { Inter } from "next/font/google"; // বা তোমার যে ফন্ট আছে
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast"; // ১. এই লাইনটি ইমপোর্ট করো
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NovaPay - Manage your finances",
  description: "A modern fintech application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>

        {/* ২. ঠিক <body> ট্যাগ শেষ হওয়ার আগে এই লাইনটি বসিয়ে দাও */}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}