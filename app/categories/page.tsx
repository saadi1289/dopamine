'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Grid, List } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { mockCategories, mockProducts } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categoryProducts = selectedCategory 
    ? mockProducts.filter(product => product.category === selectedCategory)
    : []

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary-600" />
            <span className="text-primary-600 font-semibold">Explore Collections</span>
            <Sparkles className="w-6 h-6 text-primary-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">
            Shop by Category
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated categories, each designed to deliver 
            the ultimate dopamine rush through premium products and experiences.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div
              key="categories"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {mockCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  className="group cursor-pointer"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <motion.div
                    className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
                    whileHover={{ y: -10 }}
                  >
                    {/* Background Image */}
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <h3 className="text-3xl font-display font-bold mb-3">
                          {category.name}
                        </h3>
                        <p className="text-white/90 mb-4 leading-relaxed">
                          {category.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-accent-400 font-semibold">
                            {category.productCount} products
                          </span>
                          <motion.div
                            className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            <span className="font-semibold">Explore</span>
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    />

                    {/* Floating Elements */}
                    <motion.div
                      className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-6 h-6 text-white" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Category Products View */
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category Header */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <motion.button
                      onClick={() => setSelectedCategory(null)}
                      className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4 font-semibold"
                      whileHover={{ x: -5 }}
                    >
                      <ArrowRight className="w-5 h-5 rotate-180" />
                      Back to Categories
                    </motion.button>
                    <h2 className="text-4xl font-display font-bold gradient-text mb-2">
                      {selectedCategory}
                    </h2>
                    <p className="text-neutral-600 text-lg">
                      {mockCategories.find(c => c.name === selectedCategory)?.description}
                    </p>
                  </div>
                  
                  {/* View Mode Toggle */}
                  <div className="flex bg-neutral-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-lg transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-white shadow-sm text-primary-600' 
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-lg transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-white shadow-sm text-primary-600' 
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="text-neutral-600">
                  Showing {categoryProducts.length} products
                </div>
              </div>

              {/* Products Grid */}
              <motion.div
                className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {categoryProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    custom={index}
                  >
                    <ProductCard 
                      product={product} 
                      viewMode={viewMode}
                      priority={index < 8}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {categoryProducts.length === 0 && (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold mb-2">No products found</h3>
                  <p className="text-neutral-600 mb-6">
                    This category is coming soon with amazing products!
                  </p>
                  <motion.button
                    onClick={() => setSelectedCategory(null)}
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Other Categories
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured Categories Section */}
        {!selectedCategory && (
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-3xl p-12 text-white text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Sparkles className="w-12 h-12 text-accent-400 mx-auto mb-6" />
                <h3 className="text-4xl font-display font-bold mb-4">
                  Can't Find What You're Looking For?
                </h3>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Discover our complete product collection with advanced filters 
                  and search capabilities to find your perfect dopamine hit.
                </p>
                <Link href="/products">
                  <motion.button
                    className="btn-accent text-lg px-8 py-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse All Products
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}