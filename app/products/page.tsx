'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, X, ChevronDown, Grid, List, Search } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { mockProducts } from '@/lib/data'
import { Product, FilterOptions } from '@/types'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' }
]

const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'Canon']
const categories = ['Electronics', 'Fashion', 'Sports', 'Home', 'Beauty']

export default function ProductsPage() {

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000],
    brands: [],
    categories: [],
    rating: 0,
    inStock: false
  })

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.brand.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false
      }

      // Stock filter
      if (filters.inStock && product.stock === 0) {
        return false
      }

      return true
    })

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [searchQuery, filters, sortBy])

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const toggleArrayFilter = (key: 'brands' | 'categories', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }))
  }

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      brands: [],
      categories: [],
      rating: 0,
      inStock: false
    })
    setSearchQuery('')
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
            All Products
          </h1>
          <p className="text-xl text-neutral-600">
            Discover our complete collection of dopamine-inducing products
          </p>
        </motion.div>

        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-24">
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-neutral-500 hover:text-neutral-700"
                  >
                    Clear All
                  </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Search</h4>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={filters.priceRange[1]}
                      onChange={(e) => updateFilter('priceRange', [0, parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-neutral-600">
                      <span>$0</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Brands</h4>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(brand)}
                          onChange={() => toggleArrayFilter('brands', brand)}
                          className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category)}
                          onChange={() => toggleArrayFilter('categories', category)}
                          className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() => updateFilter('rating', rating)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">{rating}+ Stars</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* In Stock */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => updateFilter('inStock', e.target.checked)}
                      className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm">In Stock Only</span>
                  </label>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Content - Products */}
          <div className="flex-1">
            {/* Controls Bar */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-neutral-600">
                  Showing {filteredProducts.length} of {mockProducts.length} products
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {/* View Mode */}
                  <div className="flex bg-neutral-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}
              layout
            >
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProductCard 
                      product={product} 
                      viewMode={viewMode}
                      priority={index < 6}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2">No products found</h3>
                <p className="text-neutral-600 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}