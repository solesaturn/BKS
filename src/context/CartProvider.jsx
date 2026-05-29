import { useCallback, useEffect, useMemo, useState } from 'react'
import { getProductById } from '../data/products'
import { CartContext } from './cartContext'

const STORAGE_KEY = 'bks-cart'

function loadLines() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (x) =>
          x &&
          typeof x.productId === 'string' &&
          typeof x.quantity === 'number' &&
          x.quantity > 0,
      )
      .map((x) => ({ productId: x.productId, quantity: Math.floor(x.quantity) }))
  } catch {
    return []
  }
}

function saveLines(lines) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  } catch {
    /* ignore quota */
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(loadLines)

  useEffect(() => {
    saveLines(lines)
  }, [lines])

  const addItem = useCallback((productId, amount = 1) => {
    const n = Math.max(1, Math.floor(amount))
    setLines((prev) => {
      const i = prev.findIndex((l) => l.productId === productId)
      if (i === -1) return [...prev, { productId, quantity: n }]
      const next = [...prev]
      next[i] = { ...next[i], quantity: next[i].quantity + n }
      return next
    })
  }, [])

  const setQuantity = useCallback((productId, quantity) => {
    const q = Math.floor(quantity)
    if (q < 1) {
      setLines((prev) => prev.filter((l) => l.productId !== productId))
      return
    }
    setLines((prev) => {
      const i = prev.findIndex((l) => l.productId === productId)
      if (i === -1) return [...prev, { productId, quantity: q }]
      const next = [...prev]
      next[i] = { productId, quantity: q }
      return next
    })
  }, [])

  const increment = useCallback((productId) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.productId === productId)
      if (i === -1) return [...prev, { productId, quantity: 1 }]
      const next = [...prev]
      next[i] = { ...next[i], quantity: next[i].quantity + 1 }
      return next
    })
  }, [])

  const decrement = useCallback((productId) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.productId === productId)
      if (i === -1) return prev
      const q = prev[i].quantity - 1
      if (q < 1) return prev.filter((l) => l.productId !== productId)
      const next = [...prev]
      next[i] = { productId, quantity: q }
      return next
    })
  }, [])

  const removeItem = useCallback((productId) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId))
  }, [])

  const clearCart = useCallback(() => setLines([]), [])

  const value = useMemo(() => {
    const items = lines
      .map((line) => {
        const product = getProductById(line.productId)
        if (!product) return null
        return {
          ...line,
          product,
          lineTotal: product.price * line.quantity,
        }
      })
      .filter(Boolean)

    const totalItems = items.reduce((s, x) => s + x.quantity, 0)
    const totalPrice = items.reduce((s, x) => s + x.lineTotal, 0)

    return {
      lines,
      items,
      totalItems,
      totalPrice,
      addItem,
      setQuantity,
      increment,
      decrement,
      removeItem,
      clearCart,
    }
  }, [
    lines,
    addItem,
    setQuantity,
    increment,
    decrement,
    removeItem,
    clearCart,
  ])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
