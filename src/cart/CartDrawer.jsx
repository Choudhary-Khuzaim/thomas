import { Link } from 'react-router-dom'
import { BookCover } from '../icons.jsx'
import journalImg from '../assets/journal-heavenly-lessons.jpg'
import printImg from '../assets/print-eight-themes.jpg'
import mugImg from '../assets/mug-higher-living.jpg'
import toteImg from '../assets/tote-spiritual-wisdom.jpg'
import candleImg from '../assets/candle-brighter-future.jpg'
import notecardsImg from '../assets/notecards-heavenly-lessons.jpg'
import { useCart } from './CartContext.jsx'
import './CartDrawer.css'

const PRODUCT_IMAGES = {
  journal: journalImg,
  print: printImg,
  mug: mugImg,
  tote: toteImg,
  candle: candleImg,
  notecards: notecardsImg,
}

function CartThumb({ item }) {
  if (item.kind === 'coverA') {
    return (
      <BookCover
        variant="A"
        size="sm"
        title="A Collection of"
        italic="Heavenly Lessons"
      />
    )
  }
  if (item.kind === 'coverB') {
    return <BookCover variant="B" size="sm" title="Trinity" italic="in Unity" />
  }

  const src = PRODUCT_IMAGES[item.kind]
  if (src) {
    return <img src={src} alt="" />
  }

  return <div className="cart-thumb-fallback" />
}

function formatMoney(amount) {
  return `$${amount.toFixed(2)}`
}

export default function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    isOpen,
    closeCart,
    removeItem,
    setQty,
  } = useCart()

  return (
    <>
      <div
        className={`cart-overlay${isOpen ? ' open' : ''}`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />
      <aside
        className={`cart-drawer${isOpen ? ' open' : ''}`}
        aria-hidden={!isOpen}
        aria-label="Shopping cart"
      >
        <div className="cart-drawer-head">
          <div>
            <div className="eyebrow">Your bag</div>
            <h2 className="disp cart-drawer-title">Cart</h2>
          </div>
          <button
            type="button"
            className="cart-close"
            onClick={closeCart}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className="cart-drawer-count">
          {count === 0
            ? 'Your cart is empty'
            : `${count} item${count === 1 ? '' : 's'}`}
        </div>

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Add a book or gift to begin your collection.</p>
              <Link className="btn" to="/shop" onClick={closeCart}>
                Continue shopping
              </Link>
            </div>
          ) : (
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.id} className="cart-line">
                  <div className="cart-thumb">
                    <CartThumb item={item} />
                  </div>
                  <div className="cart-line-copy">
                    {item.href ? (
                      <Link to={item.href} onClick={closeCart}>
                        {item.title}
                      </Link>
                    ) : (
                      <strong>{item.title}</strong>
                    )}
                    <div className="cart-line-price">{item.priceLabel}</div>
                    <div className="cart-line-actions">
                      <div className="cart-qty">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQty(item.id, item.qty - 1)}
                        >
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQty(item.id, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <div className="cart-drawer-foot">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <strong>{formatMoney(subtotal)}</strong>
            </div>
            <button type="button" className="btn cart-checkout">
              Checkout
            </button>
            <button
              type="button"
              className="btn ghost cart-keep"
              onClick={closeCart}
            >
              Keep shopping
            </button>
          </div>
        ) : null}
      </aside>
    </>
  )
}
