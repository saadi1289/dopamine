export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  sizes?: string[];
  colors?: string[];
  tags: string[];
  featured?: boolean;
  isNew?: boolean;
  onSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  image: string;
  tags: string[];
  slug: string;
  readTime: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Review {
  id: string;
  user: User;
  rating: number;
  comment: string;
  createdAt: Date;
  helpful: number;
}

export interface FilterOptions {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  onSale: boolean;
  sortBy: 'name' | 'price' | 'rating' | 'newest';
  sortOrder: 'asc' | 'desc';
}