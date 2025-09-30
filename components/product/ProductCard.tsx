'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react'
import { Product } from '@/types'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { formatPrice, getDiscountPercentage } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
  priority?: boolean
  viewMode?: 'grid' | 'list'
}

export default function ProductCard({ product, className, priority = false, viewMode = 'grid' }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const isWishlisted = isInWishlist(product.id)
  const discountPercentage = product.originalPrice 
    ? getDiscountPercentage(product.originalPrice, product.price)
    : 0

  if (viewMode === 'list') {
    return (
      <motion.div
        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
        whileHover={{ y: -2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="flex">
          {/* Image Section */}
          <div className="relative w-48 h-48 flex-shrink-0">
            <Image
              src={product.images[currentImageIndex]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500"
              priority={priority}
              sizes="192px"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  NEW
                </span>
              )}
              {product.onSale && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{discountPercentage}%
                </span>
              )}
              {product.featured && (
                <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  FEATURED
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <motion.button
              className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlistToggle}
            >
              <Heart 
                className={`w-5 h-5 transition-colors ${
                  isWishlisted 
                    ? 'text-red-500 fill-current' 
                    : 'text-neutral-600'
                }`} 
              />
            </motion.button>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-neutral-500 mb-1">{product.brand}</p>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-primary-600">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-neutral-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-neutral-600 ml-1">
                    ({product.reviewCount})
                  </span>
                </div>

                <span className={`text-sm font-medium ${
                  product.inStock ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </motion.button>

              <motion.button
                className="bg-neutral-200 text-neutral-700 px-4 py-3 rounded-lg hover:bg-neutral-300 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickView}
              >
                <Eye className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // TODO: Implement quick view modal
    console.log('Quick view:', product.name)
  }

  return (
    <motion.div
      className={cn('group relative', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        <div className="card overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-neutral-100">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  New
                </span>
              )}
              {product.onSale && discountPercentage > 0 && (
                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  -{discountPercentage}%
                </span>
              )}
              {product.featured && (
                <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <motion.button
              onClick={handleWishlistToggle}
              className={cn(
                'absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200',
                isWishlisted 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 backdrop-blur-sm text-neutral-600 hover:bg-red-500 hover:text-white'
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={cn('w-4 h-4', isWishlisted && 'fill-current')} />
            </motion.button>

            {/* Product Image */}
            <div className="relative w-full h-full">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Hover Image */}
              {product.images.length > 1 && (
                <Image
                  src={product.images[1]}
                  alt={product.name}
                  fill
                  className={cn(
                    'object-cover transition-all duration-500',
                    isHovered ? 'opacity-100' : 'opacity-0'
                  )}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </div>

            {/* Action Buttons Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/20 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                onClick={handleAddToCart}
                className="bg-white text-neutral-900 p-3 rounded-full shadow-lg hover:bg-purple-600 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: isHovered ? 0 : 20, 
                  opacity: isHovered ? 1 : 0 
                }}
                transition={{ delay: 0.1 }}
              >
                <ShoppingBag className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                onClick={handleQuickView}
                className="bg-white text-neutral-900 p-3 rounded-full shadow-lg hover:bg-purple-600 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: isHovered ? 0 : 20, 
                  opacity: isHovered ? 1 : 0 
                }}
                transition={{ delay: 0.2 }}
              >
                <Eye className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Image Dots */}
            {product.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setCurrentImageIndex(index)
                    }}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-200',
                      index === currentImageIndex 
                        ? 'bg-white' 
                        : 'bg-white/50 hover:bg-white/75'
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Brand */}
            <p className="text-sm text-neutral-500 mb-1">{product.brand}</p>
            
            {/* Name */}
            <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-neutral-300'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-neutral-500">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-neutral-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mt-2">
              {product.inStock ? (
                <span className="text-sm text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-sm text-red-600 font-medium">Out of Stock</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}