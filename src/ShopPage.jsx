import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  PRODUCT_CATEGORIES,
  PRICE_FILTERS,
  PRODUCTS,
  matchesPriceFilter,
  sortProducts,
} from './data/products.js'
import { BookCover, IconAccount, IconCart, IconSearch } from './icons.jsx'
import { useCart } from './cart/CartContext.jsx'
import journalImg from './assets/journal-heavenly-lessons.jpg'
import printImg from './assets/print-eight-themes.jpg'
import mugImg from './assets/mug-higher-living.jpg'
import toteImg from './assets/tote-spiritual-wisdom.jpg'
import candleImg from './assets/candle-brighter-future.jpg'
import notecardsImg from './assets/notecards-heavenly-lessons.jpg'
import './HomePage.css'
import './ShopPage.css'

const SHOP_NAV = [
  { label: 'Home', to: '/' },
  { label: 'Shop All', to: '/shop', active: true },
  { label: 'Books', to: '/shop?category=Books' },
  { label: 'Journals', to: '/shop?category=Journals' },
]

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top rated' },
  { id: 'title', label: 'A–Z' },
]

const PRODUCT_IMAGES = {
  journal: {
    src: journalImg,
    alt: 'Heavenly Lessons Reflection Journal',
  },
  print: {
    src: printImg,
    alt: 'Eight Themes Art Print',
  },
  mug: {
    src: mugImg,
    alt: 'Higher Living Ceramic Mug',
  },
  tote: {
    src: toteImg,
    alt: 'Spiritual Wisdom Canvas Tote',
  },
  candle: {
    src: candleImg,
    alt: 'A Brighter Future Candle',
  },
  notecards: {
    src: notecardsImg,
    alt: 'Heavenly Lessons Notecard Set',
  },
}

function ProductMedia({ kind }) {
  if (kind === 'coverA') {
    return (
      <BookCover
        variant="A"
        size="sm"
        title="A Collection of"
        italic="Heavenly Lessons"
      />
    )
  }
  if (kind === 'coverB') {
    return <BookCover variant="B" size="sm" title="Trinity" italic="in Unity" />
  }

  const image = PRODUCT_IMAGES[kind]
  if (!image) return null
  return <img className="shop-card-img" src={image.src} alt={image.alt} />
}

function badgeClass(badge) {
  if (!badge) return ''
  const key = badge.toLowerCase()
  if (key.includes('sale')) return 'sale'
  if (key.includes('collector')) return 'collector'
  return 'new'
}

export default function ShopPage() {
  const { count, openCart, addItem } = useCart()
  const [searchParams, setSearchParams] = useSearchParams()
  const paramCategory = searchParams.get('category') || 'All'

  const [category, setCategory] = useState(
    PRODUCT_CATEGORIES.includes(paramCategory) ? paramCategory : 'All',
  )
  const [priceId, setPriceId] = useState('all')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    availability: true,
  })

  useEffect(() => {
    const next = PRODUCT_CATEGORIES.includes(paramCategory)
      ? paramCategory
      : 'All'
    setCategory(next)
  }, [paramCategory])

  function updateCategory(next) {
    setCategory(next)
    if (next === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ category: next })
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = PRODUCTS.filter((product) => {
      if (category !== 'All' && product.category !== category) return false
      if (!matchesPriceFilter(product, priceId)) return false
      if (inStockOnly && !product.inStock) return false
      if (!q) return true
      return (
        product.title.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    })
    return sortProducts(list, sortBy)
  }, [category, priceId, inStockOnly, query, sortBy])

  const activeFilters = []
  if (category !== 'All') activeFilters.push({ key: 'category', label: category })
  if (priceId !== 'all') {
    activeFilters.push({
      key: 'price',
      label: PRICE_FILTERS.find((item) => item.id === priceId)?.label || priceId,
    })
  }
  if (inStockOnly) activeFilters.push({ key: 'stock', label: 'In stock' })

  function resetFilters() {
    updateCategory('All')
    setPriceId('all')
    setInStockOnly(false)
    setQuery('')
    setSortBy('featured')
  }

  function clearFilter(key) {
    if (key === 'category') updateCategory('All')
    if (key === 'price') setPriceId('all')
    if (key === 'stock') setInStockOnly(false)
  }

  function toggleSection(key) {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="page shop-page">
      <div className="announce">
        Complimentary domestic shipping on orders over $75 &nbsp;·&nbsp;{' '}
        <Link to="/shop">Shop the collection</Link>
      </div>

      <header className="shop-top">
        <div className="wrap shop-top-inner">
          <nav className="shop-top-nav" aria-label="Shop">
            {SHOP_NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={
                  item.active && category === 'All'
                    ? 'active'
                    : item.label === 'Books' && category === 'Books'
                      ? 'active'
                      : item.label === 'Journals' && category === 'Journals'
                        ? 'active'
                        : ''
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link to="/" className="shop-logo">
            <span className="shop-logo-name">Thomas Gontarz</span>
            <span className="shop-logo-tag">Official Store</span>
          </Link>

          <div className="shop-top-actions">
            <button type="button" className="shop-icon-btn" aria-label="Search">
              <IconSearch />
            </button>
            <button type="button" className="shop-icon-btn" aria-label="Account">
              <IconAccount />
            </button>
            <button
              type="button"
              className="shop-icon-btn shop-cart-btn"
              aria-label={`Cart, ${count} items`}
              onClick={openCart}
            >
              <IconCart />
              {count > 0 ? <span className="shop-cart-count">{count}</span> : null}
            </button>
          </div>
        </div>
      </header>

      <section className="shop-hero wrap">
        <div className="eyebrow">The Collection</div>
        <h1 className="disp shop-hero-title">Shop All</h1>
        <p className="shop-hero-lead">
          Spiritual books, journals, prints, and gifts for higher living.
        </p>
        <div className="shop-hero-meta">
          {filtered.length} items · {category === 'All' ? 'All products' : category}
        </div>
      </section>

      <section className="wrap shop-chips" aria-label="Categories">
        {PRODUCT_CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            className={`pill${category === item ? ' active' : ''}`}
            onClick={() => updateCategory(item)}
          >
            {item}
          </button>
        ))}
      </section>

      <section className="wrap shop-toolbar">
        <label className="shop-search">
          <IconSearch />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the shop"
          />
        </label>
        <label className="shop-sort">
          <span>Sort by</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="wrap shop-layout">
        <aside className="shop-filters">
          <div className="shop-filters-head">
            <h2>Filters</h2>
            <button type="button" className="shop-reset" onClick={resetFilters}>
              Reset all
            </button>
          </div>

          {activeFilters.length > 0 ? (
            <div className="shop-active-filters">
              {activeFilters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  className="shop-active-chip"
                  onClick={() => clearFilter(filter.key)}
                >
                  {filter.label} ×
                </button>
              ))}
            </div>
          ) : null}

          <div className="shop-filter-block">
            <button
              type="button"
              className="shop-filter-toggle"
              onClick={() => toggleSection('category')}
            >
              Category
              <span>{openSections.category ? '−' : '+'}</span>
            </button>
            {openSections.category ? (
              <div className="shop-filter-options">
                {PRODUCT_CATEGORIES.map((item) => (
                  <label key={item} className="shop-radio">
                    <input
                      type="radio"
                      name="category"
                      checked={category === item}
                      onChange={() => updateCategory(item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            ) : null}
          </div>

          <div className="shop-filter-block">
            <button
              type="button"
              className="shop-filter-toggle"
              onClick={() => toggleSection('price')}
            >
              Price
              <span>{openSections.price ? '−' : '+'}</span>
            </button>
            {openSections.price ? (
              <div className="shop-filter-options">
                {PRICE_FILTERS.map((item) => (
                  <label key={item.id} className="shop-radio">
                    <input
                      type="radio"
                      name="price"
                      checked={priceId === item.id}
                      onChange={() => setPriceId(item.id)}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            ) : null}
          </div>

          <div className="shop-filter-block">
            <button
              type="button"
              className="shop-filter-toggle"
              onClick={() => toggleSection('availability')}
            >
              Availability
              <span>{openSections.availability ? '−' : '+'}</span>
            </button>
            {openSections.availability ? (
              <div className="shop-filter-options">
                <label className="shop-check">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span>In stock only</span>
                </label>
              </div>
            ) : null}
          </div>
        </aside>

        <div className="shop-results">
          {filtered.length === 0 ? (
            <div className="shop-empty">
              <p>No products match these filters.</p>
              <button type="button" className="btn" onClick={resetFilters}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="shop-grid-cards">
              {filtered.map((product) => (
                <article key={product.id} className="shop-card">
                  <div className="shop-card-media">
                    {product.badge ? (
                      <span
                        className={`shop-card-badge ${badgeClass(product.badge)}`}
                      >
                        {product.badge}
                      </span>
                    ) : null}
                    {product.href ? (
                      <Link
                        to={product.href}
                        className="shop-card-visual"
                        aria-label={product.title}
                      >
                        <ProductMedia kind={product.kind} />
                      </Link>
                    ) : (
                      <div className="shop-card-visual">
                        <ProductMedia kind={product.kind} />
                      </div>
                    )}
                    <div className="shop-card-tags">
                      {product.tags.slice(0, 2).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="shop-card-body">
                    <h3 className="disp shop-card-title">{product.title}</h3>
                    <p className="shop-card-sub">{product.subtitle}</p>
                    <div className="shop-card-meta">
                      <strong>{product.priceLabel}</strong>
                      <span className="shop-card-rating">
                        ★ {product.rating.toFixed(1)}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn shop-card-add"
                      onClick={() =>
                        addItem({
                          id: product.id,
                          title: product.title,
                          priceLabel: product.priceLabel,
                          unitPrice: product.price,
                          kind: product.kind,
                          href: product.href || '/shop',
                        })
                      }
                    >
                      Add to cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="wrap shop-vip">
        <div className="shop-vip-inner">
          <div className="eyebrow">VIP Correspondence</div>
          <h2 className="disp shop-vip-title">Join the inner circle</h2>
          <p>
            Early access to new editions, signed copies, and a complimentary
            reading from Lesson One.
          </p>
          <form
            className="shop-vip-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="shop-email" className="sr-only">
              Email address
            </label>
            <input
              id="shop-email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
            />
            <button type="submit" className="btn">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <footer className="foot shop-foot">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="disp foot-name">Thomas Gontarz</div>
              <p>
                Official literary works and spiritual lifestyle goods for higher
                living and a brighter future.
              </p>
            </div>
            <div className="foot-col">
              <h4>Collections</h4>
              <Link to="/shop?category=Books">Books</Link>
              <Link to="/shop?category=Home%20%26%20gifts">Home &amp; gifts</Link>
              <Link to="/shop">Shop all</Link>
            </div>
            <div className="foot-col">
              <h4>Client care</h4>
              <a href="#shop-email">Newsletter</a>
              <a href="#shop-email">Shipping &amp; returns</a>
              <Link to="/#author">About</Link>
            </div>
            <div className="foot-col">
              <h4>We accept</h4>
              <div className="shop-pay-pills">
                {['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay'].map(
                  (method) => (
                    <span key={method}>{method}</span>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <div>© 2026 Thomas Gontarz. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
