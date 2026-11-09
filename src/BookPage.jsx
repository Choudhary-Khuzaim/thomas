import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { BookCover, IconCart } from './icons.jsx'
import { getBook, getPairedBook } from './data/books.js'
import { parseMoney, useCart } from './cart/CartContext.jsx'
import './HomePage.css'
import './BookPage.css'

const THUMBS = ['Front', '[Back cover]', '[Sample page]', '[In hand]']
const NAV = [
  { label: 'Shop', to: '/shop' },
  { label: 'Books', to: '/#books' },
  { label: 'Bundles', to: '/#bundle' },
  { label: 'About', to: '/#author' },
  { label: 'Notes & News', to: '/#journal' },
]

const PRODUCT_REVIEWS = [
  { quote: '[REVIEW QUOTE]', name: '[Reader name]' },
  { quote: '[REVIEW QUOTE]', name: '[Reader name]' },
  { quote: '[REVIEW QUOTE]', name: '[Reader name]' },
]

export default function BookPage() {
  const { slug } = useParams()
  const book = getBook(slug)
  const pair = getPairedBook(slug)
  const { count, openCart, addItem } = useCart()

  const [format, setFormat] = useState('paperback')
  const [qty, setQty] = useState(1)
  const [thumb, setThumb] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    setFormat('paperback')
    setQty(1)
    setThumb(0)
  }, [slug])

  const current = useMemo(() => {
    if (!book) return null
    return book.formats.find((f) => f.id === format) || book.formats[0]
  }, [book, format])

  if (!book) return <Navigate to="/" replace />

  function addCurrentBook() {
    addItem(
      {
        id: `${book.slug}-${current.id}`,
        title: `${book.breadcrumb} (${current.name})`,
        priceLabel: current.price,
        unitPrice: parseMoney(current.price),
        kind: book.coverVariant === 'A' ? 'coverA' : 'coverB',
        href: `/book/${book.slug}`,
      },
      qty,
    )
  }

  function addPairBook() {
    if (!pair) return
    const paperback = pair.formats[0]
    addItem({
      id: `${pair.slug}-paperback`,
      title: `${pair.breadcrumb} (${paperback.name})`,
      priceLabel: paperback.price,
      unitPrice: parseMoney(paperback.price),
      kind: pair.coverVariant === 'A' ? 'coverA' : 'coverB',
      href: `/book/${pair.slug}`,
    })
  }

  return (
    <div className="book-page page">
      <div className="announce">
        Signed paperbacks now available &nbsp;·&nbsp; [SHIPPING OFFER]
      </div>

      <header className="bp-header">
        <div className="wrap bp-header-inner">
          <Link to="/" className="disp bp-brand">
            Thomas Gontarz
          </Link>
          <nav className="nav bp-nav" aria-label="Main">
            {NAV.map((item) => (
              <Link key={item.label} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
          <button type="button" className="bp-cart" onClick={openCart}>
            <IconCart />
            Cart ({count})
          </button>
        </div>
      </header>

      <div className="wrap bp-crumbs">
        <Link to="/">Home</Link>
        &nbsp;/&nbsp;
        <Link to="/#books">Books</Link>
        &nbsp;/&nbsp;
        <span>{book.breadcrumb}</span>
      </div>

      <section className="wrap bp-main">
        <div className="bp-gallery">
          <div className="bp-stage">
            {thumb === 0 ? (
              <BookCover
                variant={book.coverVariant}
                size="lg"
                title={book.coverTitle}
                italic={book.coverItalic}
                subtitle={book.coverSubtitle}
              />
            ) : (
              <div className="bp-placeholder">{THUMBS[thumb]}</div>
            )}
          </div>
          <div className="bp-thumbs">
            {THUMBS.map((label, i) => (
              <button
                key={label}
                type="button"
                className={`bp-thumb${thumb === i ? ' active' : ''}`}
                onClick={() => setThumb(i)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bp-buy">
          <div className="eyebrow">
            {book.number} &nbsp;·&nbsp; Thomas Gontarz
          </div>
          <h1 className="disp bp-title">
            {book.titleLead} <em>{book.titleItalic}</em>
            {book.titleTrail ? ` ${book.titleTrail}` : ''}
          </h1>
          <p className="bp-subtitle">{book.subtitle}</p>
          <div className="bp-rating">
            <span aria-label="5 out of 5 stars">★★★★★</span>
            <a href="#reviews">[N] reviews</a>
          </div>

          <div className="bp-price">{current.price}</div>

          <div className="bp-format-label">
            Format: <span>{current.name}</span>
          </div>
          <div className="bp-formats">
            {book.formats.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`bp-format${format === f.id ? ' active' : ''}`}
                onClick={() => setFormat(f.id)}
              >
                {f.name}
              </button>
            ))}
          </div>

          <div className="bp-actions">
            <div className="bp-qty">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span>{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="btn bp-add"
              onClick={addCurrentBook}
            >
              Add to cart
            </button>
          </div>
          <button
            type="button"
            className="btn ghost bp-buy-now"
            onClick={addCurrentBook}
          >
            Buy it now
          </button>
          <p className="bp-amazon">
            Prefer Amazon? <a href="#">Order on Amazon</a>. Signed copies and
            bundles are only available here.
          </p>

          <div className="bp-accordions">
            <details open>
              <summary>
                About this book
                <span aria-hidden="true">+</span>
              </summary>
              {book.about.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </details>
            <details>
              <summary>
                Book details
                <span aria-hidden="true">+</span>
              </summary>
              <p>{book.details}</p>
            </details>
            <details>
              <summary>
                Shipping &amp; returns
                <span aria-hidden="true">+</span>
              </summary>
              <p>[SHIPPING AND RETURNS POLICY]</p>
            </details>
          </div>
        </div>
      </section>

      {pair ? (
        <section className="bp-pair">
          <div className="wrap">
            <div className="bp-pair-intro">
              <div className="eyebrow">Complete the Set</div>
              <h2 className="disp bp-pair-title">
                Pair it with <em>{pair.number}</em>
              </h2>
            </div>
            <div className="bp-pair-row">
              <BookCover
                variant={pair.coverVariant}
                size="md"
                title={pair.coverTitle}
                italic={pair.coverItalic}
                subtitle={pair.coverSubtitle}
              />
              <div className="bp-pair-copy">
                <h3 className="disp bp-pair-name">
                  {pair.slug === 'trinity-in-unity' ? (
                    <>
                      Trinity <em>in Unity</em>: Themes with Three
                    </>
                  ) : (
                    <>
                      {pair.titleLead} <em>{pair.titleItalic}</em>
                      {pair.titleTrail ? ` ${pair.titleTrail}` : null}
                    </>
                  )}
                </h3>
                <p>{pair.about[0]}</p>
                <div className="bp-pair-price">
                  Paperback <strong>{pair.formats[0].price}</strong>
                  &nbsp;·&nbsp; eBook <strong>{pair.formats[2].price}</strong>
                </div>
                <div className="bp-pair-actions">
                  <button
                    type="button"
                    className="btn"
                    onClick={addPairBook}
                  >
                    Add to cart
                  </button>
                  <Link className="btn ghost" to="/#bundle">
                    Get both: [BUNDLE PRICE]
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section id="reviews" className="bp-reviews">
        <div className="wrap">
          <div className="bp-reviews-intro">
            <div className="eyebrow">Reader Reviews</div>
            <h2 className="disp bp-reviews-title">
              What readers <em>say</em>
            </h2>
          </div>
          <div className="bp-reviews-grid">
            {PRODUCT_REVIEWS.map((review, i) => (
              <figure key={`${review.quote}-${i}`} className="bp-review-card">
                <div aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>“{review.quote}”</blockquote>
                <figcaption>
                  {review.name} · Verified buyer
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <footer className="foot bp-foot">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="disp foot-name">Thomas Gontarz</div>
              <p>Spiritual wisdom, higher living, and a brighter future.</p>
            </div>
            <div className="foot-col">
              <h4>Shop</h4>
              <Link to="/#books">Books</Link>
              <Link to="/#bundle">Bundles</Link>
            </div>
            <div className="foot-col">
              <h4>Explore</h4>
              <Link to="/#author">About</Link>
              <Link to="/#journal">Notes &amp; news</Link>
            </div>
            <div className="foot-col">
              <h4>Support</h4>
              <a href="#footer">Contact</a>
              <a href="#footer">Shipping</a>
              <a href="#footer">Returns</a>
            </div>
          </div>
          <div className="foot-bottom bp-foot-bottom">
            <div>© 2026 Thomas Gontarz. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
