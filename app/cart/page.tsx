'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Heart,
  Truck,
  Shield,
  RotateCcw,
  Gift,
  Tag
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { formatPrice } from '@/lib/utils'
import { mockProducts } from '@/lib/data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.3 }
  }
}

export default function CartPage() {
  const { items: cart, updateQuantity, removeFromCart, clearCart, total: cartTotal, itemCount } = useCart()
  const { addToWishlist } = useWishlist()
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  const subtotal = cartTotal
  const shipping = subtotal > 50 ? 0 : 9.99
  const discount = appliedPromo ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount

  const suggestedProducts = mockProducts.filter(product => 
    !cart.some(item => item.product.id === product.id)
  ).slice(0, 4)

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'dopamine10') {
      setAppliedPromo(promoCode)
      setPromoCode('')
    }
  }

  const moveToWishlist = (item: any) => {
    addToWishlist(item.product)
    removeFromCart(item.product.id)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-20">
        <div className="container-custom py-16">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-8xl mb-8">🛒</div>
            <h1 className="text-4xl font-display font-bold mb-4 gradient-text">
              Your Cart is Empty
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Looks like you haven't added any dopamine-inducing products yet. 
              Let's fix that!
            </p>
            <Link href="/products">
              <motion.button
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="w-6 h-6 mr-3" />
                Start Shopping
                <ArrowRight className="w-6 h-6 ml-3" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
            Shopping Cart
          </h1>
          <p className="text-xl text-neutral-600">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} ready for checkout
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Cart Items</h2>
                <motion.button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-600 font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All
                </motion.button>
              </div>

              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="border-b border-neutral-200 py-6 last:border-b-0"
                    variants={itemVariants}
                    exit="exit"
                    layout
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-neutral-900 truncate">
                              {item.product.name}
                            </h3>
                            <p className="text-neutral-600">{item.product.brand}</p>
                            {item.selectedSize && (
                              <p className="text-sm text-neutral-500">Size: {item.selectedSize}</p>
                            )}
                            {item.selectedColor && (
                              <p className="text-sm text-neutral-500">Color: {item.selectedColor}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-primary-600">
                              {formatPrice(item.product.price)}
                            </p>
                            {item.product.originalPrice && (
                              <p className="text-sm text-neutral-400 line-through">
                                {formatPrice(item.product.originalPrice)}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-neutral-200 rounded-lg">
                              <motion.button
                                onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                className="p-2 hover:bg-neutral-50 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Minus className="w-4 h-4" />
                              </motion.button>
                              <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <motion.button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-2 hover:bg-neutral-50 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Plus className="w-4 h-4" />
                              </motion.button>
                            </div>

                            <span className="text-neutral-600">
                              = {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            <motion.button
                              onClick={() => moveToWishlist(item)}
                              className="p-2 text-neutral-500 hover:text-red-500 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="Move to Wishlist"
                            >
                              <Heart className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-2 text-neutral-500 hover:text-red-500 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="Remove from Cart"
                            >
                              <Trash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Suggested Products */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-6">You Might Also Like</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {suggestedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-sm mb-1 truncate">{product.name}</h4>
                      <p className="text-primary-600 font-bold">{formatPrice(product.price)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <motion.button
                    onClick={handleApplyPromo}
                    className="btn-secondary px-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Tag className="w-4 h-4" />
                  </motion.button>
                </div>
                {appliedPromo && (
                  <motion.p
                    className="text-green-600 text-sm mt-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✓ Promo code "{appliedPromo}" applied!
                  </motion.p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="border-t border-neutral-200 pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Progress */}
              {shipping > 0 && (
                <motion.div
                  className="mb-6 p-4 bg-accent-50 rounded-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-5 h-5 text-accent-600" />
                    <span className="text-sm font-semibold">
                      Add {formatPrice(50 - subtotal)} for FREE shipping!
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-accent-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Checkout Button */}
              <motion.button
                className="w-full btn-primary text-lg py-4 mb-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingBag className="w-6 h-6 mr-3" />
                Proceed to Checkout
                <ArrowRight className="w-6 h-6 ml-3" />
              </motion.button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Truck className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold">Free Shipping</p>
                  <p className="text-xs text-neutral-600">On orders $50+</p>
                </div>
                <div>
                  <Shield className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold">Secure Payment</p>
                  <p className="text-xs text-neutral-600">SSL Protected</p>
                </div>
                <div>
                  <RotateCcw className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold">Easy Returns</p>
                  <p className="text-xs text-neutral-600">30 day policy</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}