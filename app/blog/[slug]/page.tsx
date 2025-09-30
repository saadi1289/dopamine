'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Heart, 
  MessageCircle, 
  ArrowLeft,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Link as LinkIcon,
  Tag
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { mockBlogPosts } from '@/lib/data'
import { formatDate } from '@/lib/utils'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [readingProgress, setReadingProgress] = useState(0)

  const post = mockBlogPosts.find(p => p.slug === params.slug)
  
  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog">
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Blog
            </motion.button>
          </Link>
        </div>
      </div>
    )
  }

  const relatedPosts = mockBlogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

  useEffect(() => {
    setLikes(Math.floor(Math.random() * 100) + 20)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-purple-500 z-50"
        style={{ width: `${readingProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${readingProgress}%` }}
        transition={{ duration: 0.1 }}
      />

      <div className="container-custom py-8">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/blog">
            <motion.button
              className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.article
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Header */}
              <motion.header variants={itemVariants} className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-semibold">
                    {post.category}
                  </span>
                  <div className="flex items-center text-neutral-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(post.publishedAt)}
                  </div>
                  <div className="flex items-center text-neutral-500">
                    <Clock className="w-4 h-4 mr-2" />
                    {post.readTime} min read
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                  {post.title}
                </h1>
                
                <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{post.author}</p>
                      <p className="text-neutral-500">Fashion Writer</p>
                    </div>
                  </div>

                  {/* Social Share */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={handleLike}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        isLiked 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-neutral-100 text-neutral-600 hover:bg-red-50 hover:text-red-500'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                      {likes}
                    </motion.button>
                    
                    <motion.button
                      className="p-2 bg-neutral-100 text-neutral-600 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.header>

              {/* Featured Image */}
              <motion.div
                variants={itemVariants}
                className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  priority
                />
              </motion.div>

              {/* Content */}
              <motion.div
                variants={itemVariants}
                className="prose prose-lg max-w-none"
              >
                <div className="text-neutral-700 leading-relaxed space-y-6">
                  <p>
                    Fashion is more than just clothing—it's a form of self-expression, a way to communicate 
                    who we are without saying a word. In today's rapidly evolving fashion landscape, staying 
                    ahead of trends while maintaining your personal style can feel like a delicate balancing act.
                  </p>
                  
                  <p>
                    The key to mastering this balance lies in understanding that trends are tools, not rules. 
                    They offer inspiration and fresh perspectives, but they should never overshadow your 
                    individual aesthetic. The most stylish people aren't those who follow every trend blindly, 
                    but those who selectively incorporate elements that resonate with their personal vision.
                  </p>

                  <blockquote className="border-l-4 border-primary-500 pl-6 py-4 bg-primary-50 rounded-r-lg my-8">
                    <p className="text-xl italic text-primary-800 mb-2">
                      "Style is a way to say who you are without having to speak."
                    </p>
                    <cite className="text-primary-600 font-semibold">— Rachel Zoe</cite>
                  </blockquote>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Building Your Personal Style Foundation</h2>
                  
                  <p>
                    Creating a strong personal style foundation starts with understanding your lifestyle, 
                    body type, and color preferences. This foundation becomes your North Star, guiding 
                    every fashion decision you make. When you have a clear sense of what works for you, 
                    incorporating trends becomes much more intuitive and successful.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    <div className="bg-neutral-50 p-6 rounded-xl">
                      <h3 className="text-xl font-bold mb-3">Know Your Colors</h3>
                      <p className="text-neutral-600">
                        Identify which colors make you glow and which ones wash you out. 
                        This knowledge will help you choose trend pieces that actually enhance your appearance.
                      </p>
                    </div>
                    <div className="bg-neutral-50 p-6 rounded-xl">
                      <h3 className="text-xl font-bold mb-3">Understand Your Lifestyle</h3>
                      <p className="text-neutral-600">
                        Your wardrobe should reflect how you actually live. A busy professional needs 
                        different pieces than a creative freelancer or stay-at-home parent.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Smart Trend Integration</h2>
                  
                  <p>
                    The secret to successfully incorporating trends is to start small. Instead of overhauling 
                    your entire wardrobe every season, try adding one or two trendy pieces that complement 
                    your existing style. This approach is not only more budget-friendly but also ensures 
                    that your style evolution feels natural and authentic.
                  </p>

                  <p>
                    Consider trends as accents rather than the main event. A trendy accessory, a pop of 
                    the season's hottest color, or a single statement piece can refresh your look without 
                    compromising your personal aesthetic. This strategy also makes it easier to transition 
                    away from trends when they inevitably fade.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Investment vs. Trend Pieces</h2>
                  
                  <p>
                    One of the most important fashion skills is knowing when to invest and when to experiment. 
                    Classic pieces like a well-tailored blazer, quality denim, or a versatile handbag deserve 
                    a higher investment because they'll serve you for years. Trendy pieces, on the other hand, 
                    can often be found at more affordable price points since they're meant to be temporary 
                    additions to your wardrobe.
                  </p>
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 mt-12 pt-8 border-t border-neutral-200"
              >
                <Tag className="w-5 h-5 text-neutral-500" />
                <div className="flex gap-2 flex-wrap">
                  {['Fashion', 'Style Tips', 'Trends', 'Personal Style'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-sm hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Share Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between mt-8 p-6 bg-neutral-100 rounded-2xl"
              >
                <div>
                  <h3 className="font-bold text-lg mb-2">Share this article</h3>
                  <p className="text-neutral-600">Help others discover great content</p>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Facebook className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    className="p-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    className="p-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    className="p-3 bg-neutral-600 text-white rounded-full hover:bg-neutral-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <LinkIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Author Info */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {post.author.charAt(0)}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{post.author}</h3>
                  <p className="text-neutral-600 mb-4">Fashion Writer & Style Expert</p>
                  <p className="text-sm text-neutral-500 mb-6">
                    Passionate about helping people discover their unique style and build confidence through fashion.
                  </p>
                  <motion.button
                    className="btn-primary w-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Follow
                  </motion.button>
                </div>
              </motion.div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="font-bold text-xl mb-6">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                        <motion.div
                          className="group cursor-pointer"
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex gap-3">
                            <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={relatedPost.image}
                                alt={relatedPost.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                sizes="64px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary-600 transition-colors">
                                {relatedPost.title}
                              </h4>
                              <p className="text-xs text-neutral-500 mt-1">
                                {formatDate(relatedPost.publishedAt)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Newsletter */}
              <motion.div
                className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl p-6 text-white"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="font-bold text-xl mb-3">Stay Updated</h3>
                <p className="text-sm opacity-90 mb-4">
                  Get the latest fashion insights and style tips delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 rounded-lg text-neutral-900 text-sm focus:ring-2 focus:ring-white focus:outline-none"
                  />
                  <motion.button
                    className="w-full bg-white text-primary-600 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <motion.div
          className="flex justify-between items-center mt-16 pt-8 border-t border-neutral-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link href="/blog">
            <motion.button
              className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              All Articles
            </motion.button>
          </Link>
          
          <Link href="/blog">
            <motion.button
              className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors"
              whileHover={{ x: 5 }}
            >
              Next Article
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}