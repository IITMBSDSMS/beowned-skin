import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Be-Owned Skin | Science-Based Clinical Skincare',
  description:
    'Experience transformative skincare driven by clinical data and AI diagnostics. Discover our premium Niacinamide 10% Protocol for oil control, glowing skin, and barrier repair.',
  applicationName: 'Be-Owned Skin',
  keywords: [
    'skincare',
    'niacinamide serum 10%',
    'AI skin diagnostic',
    'AI skin test',
    'acne control serum',
    'barrier repair',
    'beowned skin formulation',
    'premium skin products'
  ],
  authors: [{ name: 'Be-Owned Skin Official' }],
  creator: 'Be-Owned Skin',
  publisher: 'Be-Owned Skin',
  metadataBase: new URL('https://www.beownedskin.co'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Be-Owned Skin | The Truth in Skincare',
    description: 'Transform your skin with clinical ingredients and AI diagnostics.',
    url: 'https://www.beownedskin.co',
    siteName: 'Be-Owned Skin Official',
    images: [
      {
        url: '/images/product.png',
        width: 1200,
        height: 630,
        alt: 'Be-Owned Niacinamide 10% Serum Protocol',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Be-Owned Skin',
    description: 'Stop guessing. Discover the truth through AI Skin Diagnostics.',
    creator: '@beownedskin',
    images: ['/images/product.png'],
  },
  verification: {
    google: 'your-google-verification-code', // To be filled by marketing
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="font-inter min-h-full flex flex-col">
        {children}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
