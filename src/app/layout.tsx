import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VELDAVANA TECHNOLOGIES - IT Solutions",
  description: "Transforming businesses through innovative technology solutions. We create cutting-edge web applications, mobile apps, and cloud solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
