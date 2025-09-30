'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Heart } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { mockProducts, mockCategories } from '@/lib/data'
import Link from 'next/link'
import Image from 'next/image'

// Dynamically import Three.js component to avoid SSR issues
const ThreeHero = dynamic(() => import('@/components/ui/ThreeHero'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800" />
})

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

export default function HomePage() {
  const featuredProducts = mockProducts.filter(product => product.featured)
  const topProducts = mockProducts.slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Three.js Background */}
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800" />}>
          <ThreeHero />
        </Suspense>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-purple-700/60 to-purple-800/80" />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="flex items-center justify-center gap-2 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Sparkles className="w-6 h-6 text-accent-400" />
              <span className="text-accent-400 font-semibold">Premium Shopping Experience</span>
              <Sparkles className="w-6 h-6 text-accent-400" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="block">Dopamine</span>
              <span className="block gradient-text">Driven</span>
              <span className="block">Shopping</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Experience the future of e-commerce with our addictive, visually stunning platform. 
              Premium products meet cutting-edge design.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/products" className="btn-accent inline-flex items-center gap-2 text-lg px-8 py-4">
                  <Zap className="w-5 h-5" />
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/categories" className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Explore Categories
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
              Featured Products
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Handpicked premium products that deliver the ultimate dopamine rush
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredProducts.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} priority={index < 3} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/products" className="btn-primary inline-flex items-center gap-2">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
              Shop by Category
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Discover your perfect products across our curated categories
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {mockCategories.map((category, index) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link href={`/categories/${category.slug}`}>
                  <motion.div
                    className="group relative overflow-hidden rounded-xl aspect-square bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-white/90 mb-3">{category.description}</p>
                      <span className="text-sm text-accent-400 font-semibold">
                        {category.productCount} products
                      </span>
                    </div>
                    <motion.div
                      className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-5 h-5 text-white" />
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Top Products Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
              Top Products
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Most loved products by our community of dopamine seekers
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {topProducts.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of satisfied customers who've experienced the dopamine rush
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Sarah Johnson",
                role: "Fashion Enthusiast",
                content: "The shopping experience is absolutely addictive! The animations and smooth interactions make every purchase feel special.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Mike Chen",
                role: "Tech Professional",
                content: "I've never seen an e-commerce site this beautiful and functional. The Three.js animations are mind-blowing!",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Emma Davis",
                role: "Design Student",
                content: "Every interaction feels delightful. The attention to detail in the animations and transitions is incredible.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Heart key={i} className="w-5 h-5 text-accent-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center justify-center gap-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-white/70 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}