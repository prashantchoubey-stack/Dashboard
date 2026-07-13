import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Content Intelligence Command Center",
  description: "Executive view of the Content Repository portfolio, readiness and data quality.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
