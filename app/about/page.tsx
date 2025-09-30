'use client'

import { motion } from 'framer-motion'
import { 
  Heart, 
  Users, 
  Award, 
  Globe, 
  Truck, 
  Shield, 
  Recycle,
  Star,
  Quote
} from 'lucide-react'
import Image from 'next/image'

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

const stats = [
  { icon: Users, label: 'Happy Customers', value: '50K+' },
  { icon: Globe, label: 'Countries Served', value: '25+' },
  { icon: Award, label: 'Awards Won', value: '15+' },
  { icon: Heart, label: 'Products Loved', value: '1M+' }
]

const values = [
  {
    icon: Heart,
    title: 'Passion for Fashion',
    description: 'We believe fashion is a form of self-expression that should be accessible to everyone.'
  },
  {
    icon: Shield,
    title: 'Quality First',
    description: 'Every product is carefully curated and tested to meet our high standards of quality.'
  },
  {
    icon: Recycle,
    title: 'Sustainability',
    description: 'We are committed to sustainable practices and ethical sourcing in everything we do.'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building a community of fashion lovers who inspire and support each other.'
  }
]

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: '/images/team/sarah.jpg',
    bio: 'Fashion industry veteran with 15+ years of experience in luxury retail.'
  },
  {
    name: 'Michael Chen',
    role: 'Creative Director',
    image: '/images/team/michael.jpg',
    bio: 'Award-winning designer who brings fresh perspectives to contemporary fashion.'
  },
  {
    name: 'Emma Rodriguez',
    role: 'Head of Sustainability',
    image: '/images/team/emma.jpg',
    bio: 'Environmental advocate ensuring our practices align with our values.'
  },
  {
    name: 'David Kim',
    role: 'Customer Experience',
    image: '/images/team/david.jpg',
    bio: 'Dedicated to creating exceptional experiences for every customer.'
  }
]

const testimonials = [
  {
    name: 'Jessica Miller',
    role: 'Fashion Blogger',
    content: 'This brand has completely transformed my wardrobe. The quality and style are unmatched.',
    rating: 5
  },
  {
    name: 'Alex Thompson',
    role: 'Stylist',
    content: 'I recommend this brand to all my clients. They consistently deliver on both style and quality.',
    rating: 5
  },
  {
    name: 'Maria Garcia',
    role: 'Customer',
    content: 'Amazing customer service and beautiful products. I am a customer for life!',
    rating: 5
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-500 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-display font-bold mb-6"
            >
              Our Story
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl opacity-90 leading-relaxed"
            >
              Born from a passion for fashion and a vision to make style accessible to everyone, 
              we've been crafting exceptional experiences since 2018.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full animate-float animation-delay-2" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float animation-delay-4" />
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center group"
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-neutral-900 mb-2">{stat.value}</h3>
                <p className="text-neutral-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-display font-bold mb-6">
                Where It All Began
              </h2>
              <div className="space-y-6 text-neutral-700 leading-relaxed">
                <p>
                  It started with a simple observation: fashion should be a source of joy, 
                  not stress. Our founder, Sarah Johnson, noticed that many people struggled 
                  to find clothing that truly reflected their personality while maintaining 
                  quality and affordability.
                </p>
                <p>
                  What began as a small boutique in downtown has grown into a global community 
                  of fashion enthusiasts. We've stayed true to our core mission: making beautiful, 
                  high-quality fashion accessible to everyone, regardless of their budget or location.
                </p>
                <p>
                  Today, we're proud to serve customers in over 25 countries, but we haven't 
                  forgotten our roots. Every decision we make is guided by the same principles 
                  that started it all: authenticity, quality, and genuine care for our customers.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/about/story.jpg"
                  alt="Our Story"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center">
                <Heart className="w-16 h-16 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-display font-bold mb-6">Our Values</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              These core values guide everything we do, from product selection to customer service.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-display font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              The passionate individuals behind our brand, working together to bring you the best fashion experience.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="relative aspect-square rounded-2xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary-600">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary-600 font-semibold mb-3">{member.role}</p>
                <p className="text-neutral-600 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-purple-600 text-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-display font-bold mb-6">What People Say</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our customers and partners have to say.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl"
              >
                <Quote className="w-8 h-8 opacity-50 mb-4" />
                <p className="text-lg mb-6 leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-accent-400" />
                  ))}
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="opacity-75">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-display font-bold mb-6">
              Ready to Join Our Fashion Journey?
            </h2>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Discover your unique style with our curated collection of fashion-forward pieces. 
              Join thousands of satisfied customers who have found their perfect look with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="btn-primary px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
              <motion.button
                className="px-8 py-4 text-lg border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-primary-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}