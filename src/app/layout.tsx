import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WorkTime Analyzer',
  description: 'Monthly Work & OT Report Analyzer',
  manifest: '/manifest.json'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
