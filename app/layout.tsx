import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dopamine Store - Premium E-commerce Experience',
  description: 'Discover premium products with an addictive shopping experience. High-quality electronics, fashion, beauty, and home goods.',
  keywords: 'ecommerce, premium products, electronics, fashion, beauty, home goods',
  authors: [{ name: 'Dopamine Store' }],
  creator: 'Dopamine Store',
  publisher: 'Dopamine Store',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dopamine-store.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dopamine Store - Premium E-commerce Experience',
    description: 'Discover premium products with an addictive shopping experience.',
    url: 'https://dopamine-store.com',
    siteName: 'Dopamine Store',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dopamine Store',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dopamine Store - Premium E-commerce Experience',
    description: 'Discover premium products with an addictive shopping experience.',
    images: ['/og-image.jpg'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}