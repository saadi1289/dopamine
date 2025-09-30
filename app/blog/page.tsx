'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Calendar, User, ArrowRight, Tag, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { mockBlogPosts } from '@/lib/data'
import { formatDate } from '@/lib/utils'

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
    transition: { duration: 0.5 }
  }
}

const categories = ['All', 'Fashion', 'Lifestyle', 'Technology', 'Trends', 'Reviews']

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = mockBlogPosts[0]
  const regularPosts = filteredPosts.slice(1)

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">
            Our Blog
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Discover the latest trends, insights, and stories from the world of fashion and lifestyle.
            Get inspired and stay ahead of the curve.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Post */}
        {selectedCategory === 'All' && !searchTerm && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-8">Featured Article</h2>
            <Link href={`/blog/${featuredPost.slug}`}>
              <motion.div
                className="relative bg-white rounded-3xl shadow-xl overflow-hidden group cursor-pointer"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative aspect-[4/3] lg:aspect-auto">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                        {featuredPost.category}
                      </span>
                      <div className="flex items-center text-neutral-500 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(featuredPost.publishedAt)}
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 group-hover:text-primary-600 transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-neutral-600 text-lg mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                          {featuredPost.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{featuredPost.author}</p>
                          <div className="flex items-center text-neutral-500 text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            {featuredPost.readTime} min read
                          </div>
                        </div>
                      </div>
                      <motion.div
                        className="flex items-center text-primary-600 font-semibold group-hover:gap-3 transition-all"
                        whileHover={{ x: 5 }}
                      >
                        Read More
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        )}

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
            </h2>
            <p className="text-neutral-600">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer h-full">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-700 rounded-full text-sm font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3 text-sm text-neutral-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.publishedAt)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime} min
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-neutral-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {post.author.charAt(0)}
                          </div>
                          <span className="text-sm font-semibold">{post.author}</span>
                        </div>
                        <motion.div
                          className="flex items-center text-primary-600 font-semibold text-sm group-hover:gap-2 transition-all"
                          whileHover={{ x: 3 }}
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-2xl font-bold mb-4">No Articles Found</h3>
              <p className="text-neutral-600 mb-8">
                Try adjusting your search terms or category filter.
              </p>
              <motion.button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Our Latest Posts
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest articles, trends, and insights delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-neutral-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <motion.button
              className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-neutral-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}