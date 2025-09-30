'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Headphones,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react'
import toast from 'react-hot-toast'

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

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    details: 'hello@fashionstore.com',
    description: 'Send us an email anytime'
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: '+1 (555) 123-4567',
    description: 'Mon-Fri from 8am to 5pm'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: '123 Fashion Street, NY 10001',
    description: 'Come visit our flagship store'
  },
  {
    icon: Clock,
    title: 'Store Hours',
    details: 'Mon-Sat: 9am-8pm',
    description: 'Sunday: 11am-6pm'
  }
]

const departments = [
  {
    icon: MessageCircle,
    title: 'General Inquiries',
    email: 'info@fashionstore.com',
    description: 'Questions about our products or services'
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    email: 'support@fashionstore.com',
    description: 'Help with orders, returns, and account issues'
  },
  {
    icon: Globe,
    title: 'Press & Media',
    email: 'press@fashionstore.com',
    description: 'Media inquiries and press releases'
  }
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast.success('Message sent successfully! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

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
              Get in Touch
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl opacity-90 leading-relaxed"
            >
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full animate-float animation-delay-2" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float animation-delay-4" />
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                variants={itemVariants}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <info.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{info.title}</h3>
                <p className="text-lg font-semibold text-primary-600 mb-2">{info.details}</p>
                <p className="text-neutral-600">{info.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-display font-bold mb-8">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="order">Order Issue</option>
                    <option value="return">Return/Exchange</option>
                    <option value="partnership">Partnership</option>
                    <option value="press">Press/Media</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-display font-bold mb-8">Other Ways to Reach Us</h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                  Choose the best way to get in touch with us. We're here to help and answer any questions you might have.
                </p>
              </div>

              {/* Department Cards */}
              <div className="space-y-6">
                {departments.map((dept, index) => (
                  <motion.div
                    key={dept.title}
                    className="bg-neutral-50 p-6 rounded-2xl hover:bg-neutral-100 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <dept.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{dept.title}</h3>
                        <p className="text-primary-600 font-semibold mb-2">{dept.email}</p>
                        <p className="text-neutral-600">{dept.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <div className="pt-8 border-t border-neutral-200">
                <h3 className="text-xl font-bold mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 5 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-display font-bold mb-6">Visit Our Store</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Come experience our products in person at our flagship store in the heart of the city.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Map Placeholder */}
            <div className="aspect-[16/9] bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-neutral-500 mx-auto mb-4" />
                <p className="text-lg font-semibold text-neutral-600">Interactive Map</p>
                <p className="text-neutral-500">123 Fashion Street, New York, NY 10001</p>
              </div>
            </div>
            
            {/* Store Info */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Store Hours</h3>
                  <p className="text-neutral-600">Mon-Sat: 9am-8pm<br />Sunday: 11am-6pm</p>
                </div>
                <div className="text-center">
                  <Phone className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Phone</h3>
                  <p className="text-neutral-600">+1 (555) 123-4567</p>
                </div>
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Address</h3>
                  <p className="text-neutral-600">123 Fashion Street<br />New York, NY 10001</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-display font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Quick answers to questions you may have. Can't find what you're looking for? Contact us directly.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                question: "What are your shipping options?",
                answer: "We offer standard (5-7 business days) and express (2-3 business days) shipping. Free standard shipping on orders over $75."
              },
              {
                question: "What is your return policy?",
                answer: "We accept returns within 30 days of purchase. Items must be unworn, with tags attached, and in original packaging."
              },
              {
                question: "Do you offer international shipping?",
                answer: "Yes, we ship to over 25 countries worldwide. Shipping costs and delivery times vary by destination."
              },
              {
                question: "How can I track my order?",
                answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order in your account dashboard."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-neutral-50 p-6 rounded-2xl"
              >
                <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}