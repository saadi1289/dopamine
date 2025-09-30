'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  User,
  ChevronDown
} from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Categories', href: '/categories' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { itemCount } = useCart()
  const { itemCount: wishlistCount } = useWishlist()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="w-8 h-8 bg-gradient-to-br from-purple-600 to-accent-500 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <span className="text-white font-bold text-lg">D</span>
              </motion.div>
              <span className="font-display font-bold text-xl gradient-text">
                Dopamine
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-neutral-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-neutral-700 hover:text-purple-600 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <motion.div
                  className="relative p-2 text-neutral-700 hover:text-purple-600 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <motion.div
                  className="relative p-2 text-neutral-700 hover:text-purple-600 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {itemCount > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* User Account */}
              <motion.button
                className="hidden lg:flex items-center space-x-1 p-2 text-neutral-700 hover:text-purple-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-5 h-5" />
                <ChevronDown className="w-4 h-4" />
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-700 hover:text-purple-600 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-white border-t border-neutral-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container-custom py-4">
                <nav className="flex flex-col space-y-4">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="text-neutral-700 hover:text-purple-600 font-medium transition-colors duration-200 block py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navigation.length * 0.1 }}
                    className="pt-4 border-t border-neutral-200"
                  >
                    <Link
                      href="/account"
                      className="flex items-center space-x-2 text-neutral-700 hover:text-purple-600 font-medium transition-colors duration-200 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Account</span>
                    </Link>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-xl shadow-2xl p-6">
                <div className="flex items-center space-x-4">
                  <Search className="w-6 h-6 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 text-lg outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  )
}