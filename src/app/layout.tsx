import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shifted — SideShift Internal Tools",
  description: "Every tool, dashboard, and internal project the SideShift team has built.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
