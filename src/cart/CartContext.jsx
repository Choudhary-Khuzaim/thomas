import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0)
    const subtotal = items.reduce(
      (sum, item) => sum + item.unitPrice * item.qty,
      0,
    )

    function openCart() {
      setIsOpen(true)
    }

    function closeCart() {
      setIsOpen(false)
    }

    function toggleCart() {
      setIsOpen((open) => !open)
    }

    function addItem(product, qty = 1) {
      const amount = Math.max(1, qty)
      setItems((current) => {
        const existing = current.find((item) => item.id === product.id)
        if (existing) {
          return current.map((item) =>
            item.id === product.id
              ? { ...item, qty: item.qty + amount }
              : item,
          )
        }
        return [
          ...current,
          {
            id: product.id,
            title: product.title,
            priceLabel: product.priceLabel,
            unitPrice: product.unitPrice,
            kind: product.kind || null,
            href: product.href || null,
            qty: amount,
          },
        ]
      })
      setIsOpen(true)
    }

    function removeItem(id) {
      setItems((current) => current.filter((item) => item.id !== id))
    }

    function setQty(id, qty) {
      const next = Math.max(1, qty)
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, qty: next } : item,
        ),
      )
    }

    function clearCart() {
      setItems([])
    }

    return {
      items,
      count,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      setQty,
      clearCart,
    }
  }, [items, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider')
  }
  return ctx
}

export function parseMoney(value) {
  if (typeof value === 'number') return value
  const match = String(value).replace(/,/g, '').match(/(\d+(\.\d+)?)/)
  return match ? Number(match[1]) : 0
}
