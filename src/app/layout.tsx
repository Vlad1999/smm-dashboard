import type { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: 'SMM Dashboard',
  description: 'This is amazing SMM Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
