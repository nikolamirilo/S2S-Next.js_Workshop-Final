import Sidebar from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { Cloudinary } from "@cloudinary/url-gen";

const inter = Inter({ subsets: ["latin"] });
export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Instagram",
  description: "Full Stack Next.js Instagram Clone application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cld = new Cloudinary({ cloud: { cloudName: "dbp2wnqco" } });
  return (
    <html lang="en">
      <body className={`${inter.className} bg-stone-50`}>
        <Sidebar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
