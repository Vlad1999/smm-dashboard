import type { Metadata } from "next";
import './globals.css';
import {Roboto} from "next/font/google";

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

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
    <html lang="en" className={roboto.className} suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
