import type { Metadata } from 'next';
import './globals.css';
import { Lato, Nunito } from 'next/font/google';

const lato = Lato({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const nunito = Nunito({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

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
    <html className={`${lato.className} ${nunito.className}`} lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
