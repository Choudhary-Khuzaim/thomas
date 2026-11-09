import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { parseMoney, useCart } from './cart/CartContext.jsx'
import './HomePage.css'
import journalImg from './assets/journal-heavenly-lessons.jpg'
import printImg from './assets/print-eight-themes.jpg'
import mugImg from './assets/mug-higher-living.jpg'
import toteImg from './assets/tote-spiritual-wisdom.jpg'
import candleImg from './assets/candle-brighter-future.jpg'
import notecardsImg from './assets/notecards-heavenly-lessons.jpg'
import authorImg from './assets/THOMAS AUTHOR PIC.jpeg'
import newsLessonImg from './assets/news-lesson-one-daily.jpg'
import newsTrinityImg from './assets/news-three-degrees-trinity.jpg'
import newsShareImg from './assets/news-sharing-books.jpg'
import {
  BookCover,
  IconAccount,
  IconCart,
  IconSearch,
  CompassMark,
  TrinityMark,
} from './icons.jsx'

const NAV = [
  { label: 'Shop', to: '/shop' },
  { label: 'Books', href: '#books' },
  { label: 'Products', href: '#products' },
  { label: 'Bundles', href: '#bundle' },
  { label: 'Themes', href: '#themes' },
  { label: 'Notes & News', href: '#journal' },
  { label: 'About', href: '#author' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#footer' },
]

const TICKER = [
  'Paperback',
  'eBook',
  'Signed editions',
  'Bundles & gift sets',
  'Journals & prints',
]

const HERO_SLIDES = [
  {
    id: 'collection',
    eyebrow: 'The Collection · Inspired by Emanuel Swedenborg',
    title: (
      <>
        A Collection of <em>Heavenly</em> Lessons
      </>
    ),
    lead: 'Eight themes from the Secrets of Heaven: messages of wisdom for a more fulfilling life.',
    primary: { label: 'Shop the collection', href: '#shop' },
    secondary: { label: 'Explore the library', href: '#books' },
    visual: 'both',
  },
  {
    id: 'heavenly',
    eyebrow: 'Book One · Heavenly Lessons',
    title: (
      <>
        A Collection of <em>Heavenly</em> Lessons
      </>
    ),
    lead: 'Eight carefully organized themes on love, truth, justice, and spiritual enlightenment — drawn from the Secrets of Heaven.',
    primary: { label: 'Shop this book', to: '/book/heavenly-lessons' },
    secondary: { label: 'Explore the library', href: '#books' },
    visual: 'A',
    bookTo: '/book/heavenly-lessons',
  },
  {
    id: 'trinity',
    eyebrow: 'Book Two · Trinity in Unity',
    title: (
      <>
        Trinity <em>in Unity</em>
      </>
    ),
    lead: 'Themes with Three — spiritual wisdom on how the rational, earthly, and sensory degrees of the mind work together.',
    primary: { label: 'Shop this book', to: '/book/trinity-in-unity' },
    secondary: { label: 'Explore the library', href: '#books' },
    visual: 'B',
    bookTo: '/book/trinity-in-unity',
  },
]

const SHOP_TILES = [
  {
    title: 'Books',
    desc: 'Both titles in paperback and eBook.',
    cta: 'Shop books →',
    href: '#books',
  },
  {
    title: (
      <>
        Signed <em>Editions</em>
      </>
    ),
    desc: 'Personally signed paperbacks, with optional dedication.',
    cta: 'Shop signed →',
    href: '#signed',
  },
  {
    title: (
      <>
        Bundles & <em>Gift Sets</em>
      </>
    ),
    desc: 'Complete your shelf with both books together.',
    cta: 'Shop bundles →',
    href: '#bundle',
  },
  {
    title: (
      <>
        Journals & <em>Stationery</em>
      </>
    ),
    desc: 'Reflection journals and notecards for daily practice.',
    cta: 'Shop journals →',
    href: '#products',
  },
  {
    title: (
      <>
        Art <em>Prints</em>
      </>
    ),
    desc: 'Passages and imagery from the books for your wall.',
    cta: 'Shop prints →',
    href: '#products',
  },
  {
    title: (
      <>
        Everyday <em>Goods</em>
      </>
    ),
    desc: 'Mugs, totes, candles and small gifts.',
    cta: 'Shop goods →',
    href: '#products',
  },
]

const FEATURED_BOOKS = [
  {
    slug: 'heavenly-lessons',
    label: 'Book One',
    title: (
      <>
        Heavenly <em>Lessons</em>
      </>
    ),
    desc: 'Love, truth, deception, sin, justice and morality, explored through eight themes drawn from the Secrets of Heaven.',
    paperback: '$18.99',
    ebook: '$9.99',
    cover: {
      variant: 'A',
      title: 'A Collection of',
      italic: 'Heavenly Lessons',
      subtitle: 'Eight Themes from the Secrets of Heaven',
    },
  },
  {
    slug: 'trinity-in-unity',
    label: 'Book Two',
    title: (
      <>
        Trinity <em>in Unity</em>
      </>
    ),
    desc: 'The spiritual significance of three: how the rational, earthly and sensory levels of the mind work together.',
    paperback: '$21.95',
    ebook: '$11.95',
    cover: {
      variant: 'B',
      title: 'Trinity',
      italic: 'in Unity',
      subtitle: 'Themes with Three',
    },
  },
]

const PRODUCT_FILTERS = ['All', 'Books', 'Journals', 'Prints', 'Home & gifts']

const THEME_TAGS = [
  'Love',
  'Truth',
  'Deception',
  'Sin',
  'Justice',
  'Morality',
  'Spiritual enlightenment',
  'Compassion & faith',
]

const THEME_LEVELS = [
  {
    label: 'Level One',
    title: (
      <>
        The <em>Rational</em>
      </>
    ),
    desc: 'Divine wisdom and general truths at the highest level of the mind.',
  },
  {
    label: 'Level Two',
    title: (
      <>
        The <em>Earthly</em>
      </>
    ),
    desc: 'Particular insights that connect spiritual truth to everyday living.',
  },
  {
    label: 'Level Three',
    title: (
      <>
        The <em>Sensory</em>
      </>
    ),
    desc: 'The deeper understanding that grows from what we see, feel and experience.',
  },
]

const REVIEWS = [
  { quote: '[REVIEW QUOTE: Heavenly Lessons]', name: '[Reader name]' },
  { quote: '[REVIEW QUOTE: Trinity in Unity]', name: '[Reader name]' },
  { quote: '[REVIEW QUOTE: both books]', name: '[Reader name]' },
]

const JOURNAL_POSTS = [
  {
    title: 'Lesson One as a daily practice',
    image: newsLessonImg,
    date: 'Oct 12, 2026',
  },
  {
    title: 'The three degrees in Trinity in Unity',
    image: newsTrinityImg,
    date: 'Sep 28, 2026',
  },
  {
    title: 'Sharing the books with others',
    image: newsShareImg,
    date: 'Sep 8, 2026',
  },
]

const RETAILERS = ['Amazon', 'Barnes & Noble', 'Bookshop', 'Kindle']

const PRODUCTS = [
  {
    id: 'heavenly',
    slug: 'heavenly-lessons',
    category: 'Books',
    title: 'A Collection of Heavenly Lessons',
    price: 'From $9.99',
    solid: true,
    kind: 'coverA',
  },
  {
    id: 'trinity',
    slug: 'trinity-in-unity',
    category: 'Books',
    title: 'Trinity in Unity: Themes with Three',
    price: 'From $11.95',
    solid: true,
    kind: 'coverB',
  },
  {
    id: 'journal',
    category: 'Journals',
    title: 'Heavenly Lessons Reflection Journal',
    price: '$14.50',
    kind: 'journal',
  },
  {
    id: 'print',
    category: 'Prints',
    title: 'Eight Themes Art Print',
    price: '$22.00',
    kind: 'print',
  },
  {
    id: 'mug',
    category: 'Home & gifts',
    title: 'Higher Living Ceramic Mug',
    price: '$18.00',
    kind: 'mug',
  },
  {
    id: 'tote',
    category: 'Home & gifts',
    title: 'Spiritual Wisdom Canvas Tote',
    price: '$24.00',
    kind: 'tote',
  },
  {
    id: 'candle',
    category: 'Home & gifts',
    title: 'A Brighter Future Candle',
    price: '$28.00',
    kind: 'candle',
  },
  {
    id: 'notecards',
    category: 'Journals',
    title: 'Heavenly Lessons Notecard Set',
    price: '$16.00',
    kind: 'notecards',
  },
]

function HeroBackdrop() {
  return (
    <svg
      className="hero-bg"
      aria-hidden="true"
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="#F3ECDD">
        <circle cx="120" cy="90" r="1.6" opacity=".7" />
        <circle cx="310" cy="210" r="1.2" opacity=".5" />
        <circle cx="520" cy="70" r="1.8" opacity=".8" />
        <circle cx="700" cy="160" r="1.1" opacity=".5" />
        <circle cx="860" cy="60" r="1.5" opacity=".7" />
        <circle cx="1180" cy="110" r="1.8" opacity=".8" />
        <circle cx="1320" cy="250" r="1.2" opacity=".5" />
        <circle cx="240" cy="560" r="1.4" opacity=".5" />
        <circle cx="1260" cy="620" r="1.6" opacity=".6" />
        <circle cx="640" cy="640" r="1.1" opacity=".4" />
      </g>
      <g className="hero-rings" fill="none" stroke="#E2B259" strokeWidth="1">
        <circle cx="1030" cy="330" r="250" opacity=".35" />
        <circle cx="1030" cy="330" r="340" opacity=".2" />
        <circle cx="1030" cy="330" r="430" opacity=".12" />
      </g>
    </svg>
  )
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

  const productImages = {
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

  const image = productImages[kind]
  if (image) {
    return <img className="product-img" src={image.src} alt={image.alt} />
  }

  return null
}

function HeroSlideVisual({ slide }) {
  if (slide.visual === 'both') {
    return (
      <div className="book-stage">
        <Link
          to="/book/trinity-in-unity"
          className="cover cB"
          aria-label="Trinity in Unity"
        >
          <div className="au">Thomas Gontarz</div>
          <TrinityMark />
          <div>
            <div className="ti">
              Trinity<em>in Unity</em>
            </div>
            <div className="su">Themes with Three</div>
          </div>
        </Link>
        <Link
          to="/book/heavenly-lessons"
          className="cover cA"
          aria-label="A Collection of Heavenly Lessons"
        >
          <div className="au">Thomas Gontarz</div>
          <CompassMark />
          <div>
            <div className="ti">
              A Collection of<em>Heavenly Lessons</em>
            </div>
            <div className="su">Eight Themes from the Secrets of Heaven</div>
          </div>
        </Link>
      </div>
    )
  }

  if (slide.visual === 'A') {
    return (
      <div className="book-stage book-stage-single">
        <Link
          to={slide.bookTo}
          className="cover cA cover-hero-solo"
          aria-label="A Collection of Heavenly Lessons"
        >
          <div className="au">Thomas Gontarz</div>
          <CompassMark />
          <div>
            <div className="ti">
              A Collection of<em>Heavenly Lessons</em>
            </div>
            <div className="su">Eight Themes from the Secrets of Heaven</div>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className="book-stage book-stage-single">
      <Link
        to={slide.bookTo}
        className="cover cB cover-hero-solo"
        aria-label="Trinity in Unity"
      >
        <div className="au">Thomas Gontarz</div>
        <TrinityMark />
        <div>
          <div className="ti">
            Trinity<em>in Unity</em>
          </div>
          <div className="su">Themes with Three</div>
        </div>
      </Link>
    </div>
  )
}

export default function HomePage() {
  const { count, openCart, addItem } = useCart()
  const [filter, setFilter] = useState('All')
  const [heroIndex, setHeroIndex] = useState(0)
  const visible =
    filter === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === filter)

  function addProduct(product) {
    addItem({
      id: product.id,
      title: product.title,
      priceLabel: product.price,
      unitPrice: parseMoney(product.price),
      kind: product.kind,
      href: product.slug ? `/book/${product.slug}` : '/shop',
    })
  }

  function addFeaturedBook(book) {
    addItem({
      id: book.slug,
      title:
        book.slug === 'heavenly-lessons'
          ? 'A Collection of Heavenly Lessons'
          : 'Trinity in Unity: Themes with Three',
      priceLabel: book.paperback,
      unitPrice: parseMoney(book.paperback),
      kind: book.cover.variant === 'A' ? 'coverA' : 'coverB',
      href: `/book/${book.slug}`,
    })
  }

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % HERO_SLIDES.length)
    }, 6500)
    return () => window.clearInterval(id)
  }, [heroIndex])

  const slide = HERO_SLIDES[heroIndex]
  const slideLabel = String(heroIndex + 1).padStart(2, '0')

  return (
    <div className="page">
      <div className="announce">
        Signed paperbacks now available &nbsp;·&nbsp; [SHIPPING OFFER] &nbsp;·&nbsp;{' '}
        <Link to="/shop">Shop the collection</Link>
      </div>

      <div className="util">
        <div className="wrap util-inner">
          <div className="util-links">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Amazon</a>
            <a href="#">LinkedIn</a>
          </div>
          <div className="util-actions">
            <a href="#newsletter">Newsletter</a>
            <a href="#" className="util-icon" aria-label="Search">
              <IconSearch />
              Search
            </a>
            <a href="#" className="util-icon">
              <IconAccount />
              Account
            </a>
            <button
              type="button"
              className="util-icon cart"
              onClick={openCart}
            >
              <IconCart />
              Cart ({count})
            </button>
          </div>
        </div>
      </div>

      <header className="site-header">
        <a href="/" className="brand">
          <h1 className="brand-name">Thomas Gontarz</h1>
        </a>
        <div className="brand-tag">
          Spiritual Wisdom &nbsp;·&nbsp; Higher Living &nbsp;·&nbsp; A Brighter
          Future
        </div>
        <nav className="nav" aria-label="Main">
          {NAV.map((item) =>
            item.to ? (
              <Link key={item.label} to={item.to}>
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ),
          )}
        </nav>
      </header>

      <section className="hero" aria-roledescription="carousel">
        <HeroBackdrop />
        <div className="wrap hero-inner">
          <div className="hero-copy" key={`copy-${slide.id}`}>
            <div className="eyebrow">{slide.eyebrow}</div>
            <h2 className="disp hero-title">{slide.title}</h2>
            <p className="hero-lead">{slide.lead}</p>
            <div className="hero-ctas">
              {slide.primary.to ? (
                <Link className="btn" to={slide.primary.to}>
                  {slide.primary.label}
                </Link>
              ) : (
                <a className="btn" href={slide.primary.href}>
                  {slide.primary.label}
                </a>
              )}
              <a className="btn ghost" href={slide.secondary.href}>
                {slide.secondary.label}
              </a>
            </div>
            <div className="hero-pager" role="tablist" aria-label="Hero slides">
              {HERO_SLIDES.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={index === heroIndex}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`pager-bar${index === heroIndex ? ' on' : ' off'}`}
                  onClick={() => setHeroIndex(index)}
                />
              ))}
              <span className="pager-label">
                {slideLabel} / 0{HERO_SLIDES.length}
              </span>
            </div>
          </div>

          <div className="hero-visual" key={`visual-${slide.id}`}>
            <HeroSlideVisual slide={slide} />
          </div>
        </div>
      </section>

      <div className="ticker">
        <div className="wrap ticker-inner">
          {TICKER.flatMap((item, i) =>
            i === 0
              ? [<span key={item}>{item}</span>]
              : [
                  <span key={`${item}-gem`} className="ticker-gem">
                    ✦
                  </span>,
                  <span key={item}>{item}</span>,
                ],
          )}
        </div>
      </div>

      <section id="shop" className="shop">
        <div className="wrap">
          <div className="shop-intro">
            <div className="eyebrow">The Shop</div>
            <h2 className="disp shop-title">
              Explore the library <em>and beyond</em>
            </h2>
            <p className="shop-lead">
              One home for every edition, every gift, and every way to carry the
              teachings into daily life.
            </p>
          </div>
          <div className="shop-grid">
            {SHOP_TILES.map((tile) => (
              <a key={tile.cta} className="tile" href={tile.href}>
                <div>
                  <div className="disp tile-title">{tile.title}</div>
                  <p className="tile-desc">{tile.desc}</p>
                </div>
                <div className="go">{tile.cta}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="books" className="books light">
        <div className="wrap">
          <div className="books-head">
            <div>
              <div className="eyebrow">Featured Books</div>
              <h2 className="disp books-title">
                Two books. <em>One journey.</em>
              </h2>
            </div>
            <a href="#products" className="text-link dark">
              View all books
            </a>
          </div>

          <div className="books-grid">
            {FEATURED_BOOKS.map((book) => (
              <article key={book.label} className="book-card">
                <Link
                  to={`/book/${book.slug}`}
                  className="book-card-cover"
                  aria-label={book.label}
                >
                  <BookCover
                    variant={book.cover.variant}
                    size="md"
                    title={book.cover.title}
                    italic={book.cover.italic}
                    subtitle={book.cover.subtitle}
                  />
                </Link>
                <div className="book-card-body">
                  <div className="eyebrow">{book.label}</div>
                  <h3 className="disp book-card-title">{book.title}</h3>
                  <p className="book-card-desc">{book.desc}</p>
                  <div className="book-card-price">
                    Paperback <strong>{book.paperback}</strong>
                    <br />
                    eBook <strong>{book.ebook}</strong>
                  </div>
                  <div className="book-card-actions">
                    <button
                      type="button"
                      className="btn dark"
                      onClick={() => addFeaturedBook(book)}
                    >
                      Add to cart
                    </button>
                    <Link
                      to={`/book/${book.slug}`}
                      className="text-link dark underline"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="products">
        <div className="wrap">
          <div className="products-head">
            <div className="products-intro">
              <div className="eyebrow">The Store</div>
              <h2 className="disp products-title">
                Shop the <em>collection</em>
              </h2>
              <p className="products-lead">
                Books, journals, prints and gifts that carry the lessons into
                everyday life.
              </p>
            </div>
            <a className="btn ghost" href="#products">
              Shop all products
            </a>
          </div>

          <div className="product-filters" role="tablist" aria-label="Product categories">
            {PRODUCT_FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                className={`pill${filter === item ? ' active' : ''}`}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {visible.map((product) => {
              const href = product.slug
                ? `/book/${product.slug}`
                : '#products'
              const MediaTag = product.slug ? Link : 'a'
              const mediaProps = product.slug
                ? { to: href }
                : { href }
              return (
                <article key={product.id} className="product-card">
                  <MediaTag
                    {...mediaProps}
                    className="product-media"
                    aria-label={product.title}
                  >
                    <ProductMedia kind={product.kind} />
                  </MediaTag>
                  <div className="product-body">
                    <div className="product-cat">{product.category}</div>
                    <h3 className="product-name">{product.title}</h3>
                    <div className="product-price">{product.price}</div>
                    <button
                      type="button"
                      className="btn product-btn"
                      onClick={() => addProduct(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </article>
              )
            })}
          </div>

          <p className="products-note">
            Product range shown as a concept. Items, photography and prices to
            be confirmed at launch.
          </p>
        </div>
      </section>

      <section id="bundle" className="bundle">
        <div className="wrap bundle-inner">
          <div className="bundle-visual">
            <div className="bundle-stage">
              <div className="cover cB cover-md bundle-book-b">
                <div className="au">Thomas Gontarz</div>
                <TrinityMark />
                <div>
                  <div className="ti">
                    Trinity<em>in Unity</em>
                  </div>
                </div>
              </div>
              <div className="cover cA cover-md bundle-book-a">
                <div className="au">Thomas Gontarz</div>
                <CompassMark />
                <div>
                  <div className="ti">
                    A Collection of<em>Heavenly Lessons</em>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bundle-copy">
            <div className="eyebrow">Bundle & Save</div>
            <h2 className="disp bundle-title">
              Complete your <em>Heavenly Shelf</em>
            </h2>
            <p className="bundle-lead">
              Both books together, as a gift set or for your own shelf. Available
              in paperback, signed paperback, and eBook bundles.
            </p>
            <div className="bundle-price">
              Bought separately: <s>$40.94</s>
              &nbsp; Bundle price:{' '}
              <strong>[BUNDLE PRICE]</strong>
            </div>
            <div className="bundle-cta">
              <a className="btn" href="#products">
                Shop the bundle
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="themes" className="themes">
        <div className="wrap">
          <div className="themes-intro">
            <div className="eyebrow">Inside the Books</div>
            <h2 className="disp themes-title">
              Wisdom for the <em>inner life</em>
            </h2>
            <p className="themes-lead">
              Drawing on biblical teachings and personal experience, the books
              examine the struggle between good and evil and the path toward a
              more peaceful, spiritually fulfilling life.
            </p>
          </div>

          <div className="theme-tags">
            {THEME_TAGS.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="theme-levels">
            {THEME_LEVELS.map((level) => (
              <div key={level.label} className="level-card">
                <div className="eyebrow">{level.label}</div>
                <h3 className="disp level-title">{level.title}</h3>
                <p className="level-desc">{level.desc}</p>
              </div>
            ))}
          </div>

          <p className="themes-foot">
            Explored in{' '}
            <em>Trinity in Unity: Themes with Three</em>
          </p>
        </div>
      </section>

      <section id="author" className="author">
        <div className="wrap author-inner">
          <div className="author-portrait-wrap">
            <div className="author-portrait-frame">
              <img
                className="author-portrait"
                src={authorImg}
                alt="Portrait of Thomas Gontarz"
              />
            </div>
          </div>
          <div className="author-copy">
            <div className="eyebrow">About the Author</div>
            <h2 className="disp author-title">
              Meet the mind behind the <em>lessons</em>
            </h2>
            <p className="author-lead">
              Thomas Gontarz writes works inspired by the spiritual teachings of
              Emanuel Swedenborg, with an emphasis on spiritual growth, inner
              peace, and life&apos;s purpose.
            </p>
            <p className="author-bio">
              [AUTHOR BIO: a few lines on his background and why he writes]
            </p>
            <div className="author-actions">
              <a className="btn ghost" href="#author">
                Read the full story
              </a>
              <a className="btn ghost" href="#journal">
                Notes &amp; news
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="newsletter" className="newsletter">
        <div className="wrap newsletter-inner">
          <div className="newsletter-copy">
            <div className="eyebrow">Join the Circle</div>
            <h2 className="disp newsletter-title">
              A free reading, <em>every inbox</em>
            </h2>
            <p className="newsletter-lead">
              Subscribe for a free sample from Lesson One, plus new writings,
              new editions, and conversations. [FREE SAMPLE TBC]
            </p>
          </div>
          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="em" className="sr-only">
              Email address
            </label>
            <input
              id="em"
              type="email"
              name="email"
              placeholder="Your email address"
              autoComplete="email"
            />
            <button type="submit" className="btn">
              Sign up now
            </button>
          </form>
        </div>
      </section>

      <section id="reviews" className="reviews light">
        <div className="wrap">
          <div className="reviews-intro">
            <div className="eyebrow">Reader Reviews</div>
            <h2 className="disp reviews-title">
              Words from <em>readers</em>
            </h2>
          </div>
          <div className="reviews-grid">
            {REVIEWS.map((review) => (
              <figure key={review.quote} className="review-card">
                <div className="review-stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <blockquote className="review-quote">
                  “{review.quote}”
                </blockquote>
                <figcaption className="review-name">{review.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="journal" className="journal">
        <div className="wrap">
          <div className="journal-head">
            <div>
              <div className="eyebrow">Latest News</div>
              <h2 className="disp journal-title">
                Notes &amp; <em>News</em>
              </h2>
            </div>
            <a href="#journal" className="text-link gold">
              Visit the blog
            </a>
          </div>
          <div className="journal-grid">
            {JOURNAL_POSTS.map((post) => (
              <a key={post.title} href="#journal" className="journal-card">
                <div className="journal-thumb">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="journal-body">
                  <div className="journal-date">{post.date}</div>
                  <h3 className="disp journal-card-title">{post.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="retailers">
        <div className="wrap retailers-inner">
          <div className="retailers-label">Also available at</div>
          <div className="retailers-pills">
            {RETAILERS.map((name) => (
              <a key={name} className="pill" href="#">
                {name}
              </a>
            ))}
          </div>
          <p className="retailers-note">
            Buy direct for signed copies, bundles and gifts that aren&apos;t
            available anywhere else.
          </p>
        </div>
      </section>

      <footer id="footer" className="foot">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="disp foot-name">Thomas Gontarz</div>
              <p>
                Spiritual wisdom, higher living, and a brighter future. Books
                inspired by the teachings of Emanuel Swedenborg.
              </p>
            </div>
            <div className="foot-col">
              <h4>Shop</h4>
              <a href="#books">Books</a>
              <a href="#signed">Signed editions</a>
              <a href="#bundle">Bundles</a>
              <a href="#products">Journals</a>
            </div>
            <div className="foot-col">
              <h4>Explore</h4>
              <a href="#author">About the author</a>
              <a href="#themes">The themes</a>
              <a href="#reviews">Reviews</a>
              <a href="#journal">Notes &amp; news</a>
            </div>
            <div className="foot-col">
              <h4>Support</h4>
              <a href="#footer">Contact</a>
              <a href="#footer">Shipping</a>
              <a href="#footer">Returns</a>
              <a href="#footer" className="foot-accent">
                Donate
              </a>
            </div>
          </div>
          <div className="foot-bottom">
            <div>© 2026 Thomas Gontarz. All rights reserved.</div>
            <div>Visa · Mastercard · Amex · PayPal · Shop Pay</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
