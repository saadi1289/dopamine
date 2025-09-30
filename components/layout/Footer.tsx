'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react'

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/products' },
    { name: 'Electronics', href: '/categories/electronics' },
    { name: 'Fashion', href: '/categories/fashion' },
    { name: 'Beauty', href: '/categories/beauty' },
    { name: 'Home & Living', href: '/categories/home-living' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Contact Us', href: '/contact' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
    { name: 'Sustainability', href: '/sustainability' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
}

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'YouTube', href: '#', icon: Youtube },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-neutral-800">
        <div className="container-custom py-12">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-display font-bold mb-4">
              Stay in the Loop
            </h3>
            <p className="text-neutral-400 mb-8 text-lg">
              Get the latest updates on new products, exclusive offers, and dopamine-inducing deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              <motion.button
                className="btn-primary flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="font-display font-bold text-2xl gradient-text">
                Dopamine
              </span>
            </Link>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Experience the future of e-commerce with our dopamine-driven shopping platform. 
              Premium products, addictive experiences, and unmatched customer satisfaction.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-neutral-400">
                <Mail className="w-5 h-5" />
                <span>hello@dopaminestore.com</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-400">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-400">
                <MapPin className="w-5 h-5" />
                <span>123 Innovation St, Tech City, TC 12345</span>
              </div>
            </div>
          </motion.div>

          {/* Shop Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <motion.p
              className="text-neutral-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              © 2024 Dopamine Store. All rights reserved. Made with ❤️ for an addictive shopping experience.
            </motion.p>
            
            <motion.div
              className="flex items-center space-x-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}