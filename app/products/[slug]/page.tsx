'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Minus, 
  Plus, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { mockProducts } from '@/lib/data'
import { formatPrice, generateStars } from '@/lib/utils'
import ProductCard from '@/components/product/ProductCard'

// Mock product data - in real app, this would come from API
const getProductBySlug = (slug: string) => {
  return mockProducts.find(p => p.slug === slug) || mockProducts[0]
}

interface ProductDetailPageProps {
  params: {
    slug: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProductBySlug(params.slug)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [activeTab, setActiveTab] = useState('description')
  const [showStickyBar, setShowStickyBar] = useState(false)

  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const isWishlisted = isInWishlist(product.id)
  const relatedProducts = mockProducts.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4)

  // Mock data for sizes and colors
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Navy', value: '#1E3A8A' },
    { name: 'Gray', value: '#6B7280' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const addToCartButton = document.getElementById('add-to-cart-button')
      if (addToCartButton) {
        const rect = addToCartButton.getBoundingClientRect()
        setShowStickyBar(rect.bottom < 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    })
  }

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Sticky Buy Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b z-50 px-4 py-3"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-custom flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={50}
                  height={50}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-primary-600 font-bold">{formatPrice(product.price)}</p>
                </div>
              </div>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100">
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    index === selectedImageIndex 
                      ? 'border-primary-500' 
                      : 'border-transparent hover:border-neutral-300'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Brand and Name */}
            <div>
              <p className="text-primary-600 font-semibold mb-2">{product.brand}</p>
              <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {generateStars(product.rating)}
                </div>
                <span className="text-neutral-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-primary-600">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-2xl text-neutral-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    className={`px-4 py-2 border-2 rounded-lg font-semibold transition-colors ${
                      selectedSize === size
                        ? 'border-primary-500 bg-primary-50 text-primary-600'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                    onClick={() => setSelectedSize(size)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Color</h3>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <motion.button
                    key={color.name}
                    className={`w-12 h-12 rounded-full border-4 transition-colors ${
                      selectedColor === color.name
                        ? 'border-primary-500'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.name)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-neutral-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-neutral-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-3 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-neutral-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-neutral-600">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <motion.button
                id="add-to-cart-button"
                className="w-full btn-primary text-lg py-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingBag className="w-6 h-6 mr-3" />
                Add to Cart - {formatPrice(product.price * quantity)}
              </motion.button>

              <div className="flex gap-4">
                <motion.button
                  className="flex-1 btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWishlistToggle}
                >
                  <Heart 
                    className={`w-5 h-5 mr-2 ${
                      isWishlisted ? 'fill-current text-red-500' : ''
                    }`} 
                  />
                  {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </motion.button>

                <motion.button
                  className="btn-secondary px-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200">
              <div className="text-center">
                <Truck className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">Free Shipping</p>
                <p className="text-xs text-neutral-600">On orders over $50</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">2 Year Warranty</p>
                <p className="text-xs text-neutral-600">Full protection</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">30 Day Returns</p>
                <p className="text-xs text-neutral-600">No questions asked</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="border-b border-neutral-200 mb-8">
            <div className="flex gap-8">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  className={`pb-4 px-2 font-semibold capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="prose prose-lg max-w-none"
            >
              {activeTab === 'description' && (
                <div>
                  <h3>Product Description</h3>
                  <p>{product.description}</p>
                  <p>Experience the perfect blend of style, comfort, and functionality with this premium product. Crafted with attention to detail and designed for the modern lifestyle.</p>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div>
                  <h3>Specifications</h3>
                  <ul>
                    <li>Material: Premium quality materials</li>
                    <li>Dimensions: Varies by size</li>
                    <li>Weight: Lightweight design</li>
                    <li>Care Instructions: Easy to maintain</li>
                    <li>Origin: Ethically sourced</li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <h3>Customer Reviews</h3>
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-neutral-200 pb-6">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-primary-600">U{review}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold">Customer {review}</h4>
                            <div className="flex items-center gap-2">
                              {generateStars(5)}
                              <span className="text-sm text-neutral-600">5.0</span>
                            </div>
                          </div>
                        </div>
                        <p>Amazing product! The quality exceeded my expectations and the design is absolutely beautiful. Highly recommend!</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Zap className="w-6 h-6 text-primary-600" />
            <h2 className="text-3xl font-display font-bold gradient-text">
              Related Products
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <ProductCard product={relatedProduct} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}