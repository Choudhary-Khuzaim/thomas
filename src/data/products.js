export const PRODUCT_CATEGORIES = [
  'All',
  'Books',
  'Journals',
  'Prints',
  'Home & gifts',
]

export const PRICE_FILTERS = [
  { id: 'all', label: 'All prices' },
  { id: 'under-25', label: 'Under $25', max: 25 },
  { id: '25-50', label: '$25 to $50', min: 25, max: 50 },
  { id: '50-plus', label: '$50 & above', min: 50 },
]

export const PRODUCTS = [
  {
    id: 'heavenly',
    slug: 'heavenly-lessons',
    category: 'Books',
    subcategory: 'Paperback & eBook',
    title: 'A Collection of Heavenly Lessons',
    subtitle: 'Eight Themes from the Secrets of Heaven',
    price: 18.99,
    priceLabel: 'From $9.99',
    rating: 4.9,
    badge: 'Collector',
    tags: ['Books', 'Wisdom'],
    kind: 'coverA',
    inStock: true,
    href: '/book/heavenly-lessons',
  },
  {
    id: 'trinity',
    slug: 'trinity-in-unity',
    category: 'Books',
    subcategory: 'Paperback & eBook',
    title: 'Trinity in Unity: Themes with Three',
    subtitle: 'Themes with Three',
    price: 21.95,
    priceLabel: 'From $11.95',
    rating: 4.8,
    badge: 'New arrival',
    tags: ['Books', 'Trinity'],
    kind: 'coverB',
    inStock: true,
    href: '/book/trinity-in-unity',
  },
  {
    id: 'journal',
    category: 'Journals',
    subcategory: 'Stationery',
    title: 'Heavenly Lessons Reflection Journal',
    subtitle: 'Daily practice companion',
    price: 14.5,
    priceLabel: '$14.50',
    rating: 4.7,
    badge: 'New arrival',
    tags: ['Journals', 'Stationery'],
    kind: 'journal',
    inStock: true,
  },
  {
    id: 'print',
    category: 'Prints',
    subcategory: 'Wall art',
    title: 'Eight Themes Art Print',
    subtitle: 'Gallery-ready print',
    price: 22,
    priceLabel: '$22.00',
    rating: 4.6,
    badge: null,
    tags: ['Prints', 'Decor'],
    kind: 'print',
    inStock: true,
  },
  {
    id: 'mug',
    category: 'Home & gifts',
    subcategory: 'Home & gifts',
    title: 'Higher Living Ceramic Mug',
    subtitle: 'Everyday ritual',
    price: 18,
    priceLabel: '$18.00',
    rating: 4.5,
    badge: null,
    tags: ['Home', 'Gifts'],
    kind: 'mug',
    inStock: true,
  },
  {
    id: 'tote',
    category: 'Home & gifts',
    subcategory: 'Home & gifts',
    title: 'Spiritual Wisdom Canvas Tote',
    subtitle: 'Carry the lessons',
    price: 24,
    priceLabel: '$24.00',
    rating: 4.6,
    badge: 'Sale',
    tags: ['Home', 'Tote'],
    kind: 'tote',
    inStock: true,
  },
  {
    id: 'candle',
    category: 'Home & gifts',
    subcategory: 'Fragrance & ritual',
    title: 'A Brighter Future Candle',
    subtitle: 'Atmosphere for reading',
    price: 28,
    priceLabel: '$28.00',
    rating: 4.8,
    badge: 'New arrival',
    tags: ['Home', 'Ritual'],
    kind: 'candle',
    inStock: true,
  },
  {
    id: 'notecards',
    category: 'Journals',
    subcategory: 'Stationery',
    title: 'Heavenly Lessons Notecard Set',
    subtitle: 'Share a word of wisdom',
    price: 16,
    priceLabel: '$16.00',
    rating: 4.4,
    badge: null,
    tags: ['Journals', 'Stationery'],
    kind: 'notecards',
    inStock: true,
  },
]

export function matchesPriceFilter(product, priceId) {
  const rule = PRICE_FILTERS.find((item) => item.id === priceId)
  if (!rule || priceId === 'all') return true
  if (rule.min != null && rule.max != null) {
    return product.price >= rule.min && product.price < rule.max
  }
  if (rule.min != null) return product.price >= rule.min
  if (rule.max != null) return product.price < rule.max
  return true
}

export function sortProducts(list, sortBy) {
  const next = [...list]
  switch (sortBy) {
    case 'price-asc':
      return next.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return next.sort((a, b) => b.price - a.price)
    case 'rating':
      return next.sort((a, b) => b.rating - a.rating)
    case 'title':
      return next.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return next
  }
}
