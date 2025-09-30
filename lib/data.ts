import { Product, Category, BlogPost } from '@/types'

// Mock product data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    price: 299.99,
    originalPrice: 399.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    brand: 'AudioTech',
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    colors: ['Black', 'White', 'Silver'],
    tags: ['wireless', 'noise-cancelling', 'premium'],
    featured: true,
    onSale: true
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
    price: 249.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    brand: 'FitTech',
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    colors: ['Black', 'Rose Gold', 'Silver'],
    tags: ['fitness', 'smartwatch', 'health'],
    featured: true,
    isNew: true
  },
  {
    id: '3',
    name: 'Minimalist Backpack',
    description: 'Sleek and functional backpack perfect for work and travel.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500&h=500&fit=crop'
    ],
    category: 'Fashion',
    brand: 'UrbanStyle',
    rating: 4.4,
    reviewCount: 67,
    inStock: true,
    colors: ['Black', 'Navy', 'Gray'],
    tags: ['minimalist', 'travel', 'work'],
    featured: false
  },
  {
    id: '4',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt.',
    price: 29.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop'
    ],
    category: 'Fashion',
    brand: 'EcoWear',
    rating: 4.2,
    reviewCount: 156,
    inStock: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy', 'Gray'],
    tags: ['organic', 'sustainable', 'comfortable']
  },
  {
    id: '5',
    name: 'Professional Camera Lens',
    description: '85mm f/1.4 portrait lens for professional photography.',
    price: 1299.99,
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    brand: 'PhotoPro',
    rating: 4.9,
    reviewCount: 43,
    inStock: true,
    tags: ['photography', 'professional', 'portrait'],
    featured: true
  },
  {
    id: '6',
    name: 'Luxury Skincare Set',
    description: 'Complete skincare routine with premium natural ingredients.',
    price: 159.99,
    originalPrice: 199.99,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop'
    ],
    category: 'Beauty',
    brand: 'GlowLux',
    rating: 4.7,
    reviewCount: 201,
    inStock: true,
    tags: ['skincare', 'luxury', 'natural'],
    onSale: true
  }
]

// Mock categories
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    productCount: 156,
    slug: 'electronics'
  },
  {
    id: '2',
    name: 'Fashion',
    description: 'Trendy clothing and accessories',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    productCount: 234,
    slug: 'fashion'
  },
  {
    id: '3',
    name: 'Beauty',
    description: 'Skincare, makeup, and beauty products',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    productCount: 89,
    slug: 'beauty'
  },
  {
    id: '4',
    name: 'Home & Living',
    description: 'Furniture and home decor',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    productCount: 167,
    slug: 'home-living'
  }
]

// Mock blog posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Sustainable Fashion',
    excerpt: 'Exploring how eco-friendly materials are revolutionizing the fashion industry.',
    content: 'Full blog content here...',
    author: 'Sarah Johnson',
    publishedAt: new Date('2024-01-15'),
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    tags: ['fashion', 'sustainability', 'trends'],
    slug: 'future-sustainable-fashion',
    readTime: 5
  },
  {
    id: '2',
    title: 'Tech Trends to Watch in 2024',
    excerpt: 'The latest innovations that will shape our digital future.',
    content: 'Full blog content here...',
    author: 'Mike Chen',
    publishedAt: new Date('2024-01-10'),
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
    tags: ['technology', 'innovation', 'future'],
    slug: 'tech-trends-2024',
    readTime: 7
  },
  {
    id: '3',
    title: 'Building a Minimalist Wardrobe',
    excerpt: 'How to create a versatile wardrobe with fewer, better pieces.',
    content: 'Full blog content here...',
    author: 'Emma Davis',
    publishedAt: new Date('2024-01-05'),
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=400&fit=crop',
    tags: ['fashion', 'minimalism', 'lifestyle'],
    slug: 'minimalist-wardrobe',
    readTime: 4
  }
]