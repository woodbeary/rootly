import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rootly | Modern Incident Management",
  description: "Automate incident management workflows, reduce MTTR, and prevent future incidents with Rootly's modern incident management platform.",
  metadataBase: new URL('https://rootly.com'),
  openGraph: {
    title: "Rootly | Modern Incident Management",
    description: "Automate incident management workflows, reduce MTTR, and prevent future incidents with Rootly's modern incident management platform.",
    url: 'https://rootly.com',
    siteName: 'Rootly',
    images: [
      {
        url: 'https://rootly.com/og-image.png', // You'll need the actual OG image URL
        width: 1200,
        height: 630,
        alt: 'Rootly - Modern Incident Management'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Rootly | Modern Incident Management",
    description: "Automate incident management workflows, reduce MTTR, and prevent future incidents with Rootly's modern incident management platform.",
    images: ['https://rootly.com/twitter-image.png'], // You'll need the actual Twitter image URL
    creator: '@rootlyio'
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
