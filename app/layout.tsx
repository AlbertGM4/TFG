import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from './components/Header';
import Footer from './components/Footer';

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tejedor",
  description: "Web para amantes del tejido y la costura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow py-14">{children}</main>
          <Footer />
        </div>
      </body>
    </html >
  );
}
