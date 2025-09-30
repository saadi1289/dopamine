'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { WishlistItem, Product } from '@/types'
import toast from 'react-hot-toast'

interface WishlistState {
  items: WishlistItem[]
  itemCount: number
}

interface WishlistContextType extends WishlistState {
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: WishlistItem }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] }

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const existingItem = state.items.find(item => item.product.id === action.payload.product.id)
      
      if (existingItem) {
        return state // Item already in wishlist
      }

      const newItems = [...state.items, action.payload]
      return { items: newItems, itemCount: newItems.length }
    }

    case 'REMOVE_FROM_WISHLIST': {
      const newItems = state.items.filter(item => item.product.id !== action.payload)
      return { items: newItems, itemCount: newItems.length }
    }

    case 'CLEAR_WISHLIST':
      return { items: [], itemCount: 0 }

    case 'LOAD_WISHLIST':
      return { items: action.payload, itemCount: action.payload.length }

    default:
      return state
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    itemCount: 0
  })

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist)
        dispatch({ type: 'LOAD_WISHLIST', payload: wishlistItems })
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.items))
  }, [state.items])

  const addToWishlist = (product: Product) => {
    const existingItem = state.items.find(item => item.product.id === product.id)
    
    if (existingItem) {
      toast.error('Item already in wishlist!', {
        duration: 2000,
      })
      return
    }

    dispatch({
      type: 'ADD_TO_WISHLIST',
      payload: { product, addedAt: new Date() }
    })
    
    toast.success(`${product.name} added to wishlist! ❤️`, {
      duration: 3000,
      style: {
        background: '#ef4444',
        color: 'white',
      },
    })
  }

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId })
    toast.success('Removed from wishlist', {
      duration: 2000,
    })
  }

  const isInWishlist = (productId: string) => {
    return state.items.some(item => item.product.id === productId)
  }

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' })
    toast.success('Wishlist cleared', {
      duration: 2000,
    })
  }

  return (
    <WishlistContext.Provider
      value={{
        ...state,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}