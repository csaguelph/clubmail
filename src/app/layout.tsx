import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getSession } from "@/server/better-auth/server";
import { db } from "@/server/db";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "CSA ClubMail",
  description: "Secure email platform for CSA Clubs",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  robots: {
    index: false,
    follow: false,
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();

  let userRole: "ADMIN" | "USER" | undefined;
  if (session?.user) {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });
    userRole = user?.role;
  }

  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="flex min-h-screen flex-col bg-gray-50">
        <TRPCReactProvider>
          <Header user={session?.user} userRole={userRole} />
          <main className="flex-1">{children}</main>
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
