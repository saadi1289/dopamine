'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Lock,
  Check,
  ArrowLeft,
  ArrowRight,
  Gift,
  Shield,
  Star
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/utils'

const steps = [
  { id: 1, name: 'Shipping', icon: Truck },
  { id: 2, name: 'Payment', icon: CreditCard },
  { id: 3, name: 'Review', icon: Check }
]

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

export default function CheckoutPage() {
  const { cart, getCartTotal, getCartCount, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: 'same'
  })

  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsProcessing(false)
    setOrderComplete(true)
    clearCart()
  }

  if (cart.length === 0 && !orderComplete) {
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
              Add some products to your cart before checking out.
            </p>
            <Link href="/products">
              <motion.button
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Shopping
                <ArrowRight className="w-6 h-6 ml-3" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-20">
        <div className="container-custom py-16">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div
              className="text-8xl mb-8"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              🎉
            </motion.div>
            <h1 className="text-5xl font-display font-bold mb-6 gradient-text">
              Order Confirmed!
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Thank you for your purchase! Your order has been successfully placed and will be processed shortly.
            </p>
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Order Details</h2>
              <div className="text-left space-y-2">
                <div className="flex justify-between">
                  <span>Order Number:</span>
                  <span className="font-semibold">#DP{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-bold text-primary-600">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span>3-5 business days</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <motion.button
                  className="btn-secondary px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue Shopping
                </motion.button>
              </Link>
              <motion.button
                className="btn-primary px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Track Your Order
              </motion.button>
            </div>
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
            Checkout
          </h1>
          <p className="text-xl text-neutral-600">
            {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'} • {formatPrice(total)}
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step.id
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'bg-white border-neutral-300 text-neutral-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  <step.icon className="w-6 h-6" />
                </motion.div>
                <span className={`ml-3 font-semibold ${
                  currentStep >= step.id ? 'text-primary-600' : 'text-neutral-400'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                    currentStep > step.id ? 'bg-primary-600' : 'bg-neutral-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <motion.div
                  key="shipping"
                  className="bg-white rounded-2xl shadow-lg p-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Truck className="w-6 h-6 mr-3 text-primary-600" />
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold mb-2">First Name</label>
                      <input
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="John"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold mb-2">Last Name</label>
                      <input
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold mb-2">Phone</label>
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2">Address</label>
                      <input
                        type="text"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="123 Main Street"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold mb-2">City</label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="New York"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold mb-2">State</label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="NY"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold mb-2">ZIP Code</label>
                      <input
                        type="text"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="10001"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold mb-2">Country</label>
                      <select
                        value={shippingInfo.country}
                        onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <motion.div
                  key="payment"
                  className="bg-white rounded-2xl shadow-lg p-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <CreditCard className="w-6 h-6 mr-3 text-primary-600" />
                    Payment Information
                  </h2>

                  <div className="space-y-4">
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold mb-2">Card Number</label>
                      <input
                        type="text"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-semibold mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="MM/YY"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-semibold mb-2">CVV</label>
                        <input
                          type="text"
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="123"
                        />
                      </motion.div>
                    </div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold mb-2">Name on Card</label>
                      <input
                        type="text"
                        value={paymentInfo.nameOnCard}
                        onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <Shield className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-800">Secure Payment</p>
                        <p className="text-sm text-green-600">Your payment information is encrypted and secure</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <motion.div
                  key="review"
                  className="bg-white rounded-2xl shadow-lg p-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Check className="w-6 h-6 mr-3 text-primary-600" />
                    Review Your Order
                  </h2>

                  <div className="space-y-6">
                    {/* Order Items */}
                    <div>
                      <h3 className="font-semibold mb-4">Order Items</h3>
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <motion.div
                            key={item.id}
                            className="flex gap-4 p-4 border border-neutral-200 rounded-lg"
                            variants={itemVariants}
                          >
                            <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={item.images[0]}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-neutral-600 text-sm">{item.brand}</p>
                              <p className="text-sm">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <motion.div variants={itemVariants}>
                      <h3 className="font-semibold mb-2">Shipping Address</h3>
                      <div className="p-4 bg-neutral-50 rounded-lg">
                        <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                        <p>{shippingInfo.address}</p>
                        <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                        <p>{shippingInfo.country}</p>
                      </div>
                    </motion.div>

                    {/* Payment Method */}
                    <motion.div variants={itemVariants}>
                      <h3 className="font-semibold mb-2">Payment Method</h3>
                      <div className="p-4 bg-neutral-50 rounded-lg flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-neutral-600" />
                        <div>
                          <p>**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                          <p className="text-sm text-neutral-600">{paymentInfo.nameOnCard}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              className="flex justify-between mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {currentStep > 1 ? (
                <motion.button
                  onClick={handleBack}
                  className="btn-secondary px-6 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </motion.button>
              ) : (
                <Link href="/cart">
                  <motion.button
                    className="btn-secondary px-6 py-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Cart
                  </motion.button>
                </Link>
              )}

              {currentStep < 3 ? (
                <motion.button
                  onClick={handleNext}
                  className="btn-primary px-6 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              ) : (
                <motion.button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="btn-primary px-8 py-3 disabled:opacity-50"
                  whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.95 }}
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Place Order
                    </>
                  )}
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6 border-t border-neutral-200 pt-4">
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
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-neutral-200 pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <Shield className="w-4 h-4" />
                  <span>SSL Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Truck className="w-4 h-4" />
                  <span>Free shipping on orders $50+</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Star className="w-4 h-4" />
                  <span>30-day money back guarantee</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}