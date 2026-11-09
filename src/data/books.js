export const BOOKS = {
  'heavenly-lessons': {
    slug: 'heavenly-lessons',
    number: 'Book One',
    titleLead: 'A Collection of',
    titleItalic: 'Heavenly',
    titleTrail: 'Lessons',
    breadcrumb: 'A Collection of Heavenly Lessons',
    subtitle: 'Eight Themes from the Secrets of Heaven',
    coverVariant: 'A',
    coverTitle: 'A Collection of',
    coverItalic: 'Heavenly Lessons',
    coverSubtitle: 'Eight Themes from the Secrets of Heaven',
    formats: [
      { id: 'paperback', name: 'Paperback', price: '$18.99' },
      { id: 'signed', name: 'Signed paperback', price: '[SIGNED PRICE]' },
      { id: 'ebook', name: 'eBook', price: '$9.99' },
    ],
    about: [
      'A Collection of Heavenly Lessons: Eight Themes from the Secrets of Heaven is a thought-provoking spiritual book inspired by the teachings of Emanuel Swedenborg. Through eight carefully organized themes, Thomas Gontarz explores the deeper meanings of love, truth, deception, sin, justice, morality, and spiritual enlightenment.',
      'Drawing from biblical teachings and personal experiences, the author examines the struggles between good and evil, the dangers of selfishness and corruption, and the importance of compassion, fairness, and faith. This book invites readers to reflect on their inner lives, overcome negative influences, and embrace divine wisdom to live a more meaningful, peaceful, and spiritually fulfilling life.',
    ],
    details:
      'Publisher: [PUBLISHER] · Pages: [PAGE COUNT] · ISBN: [ISBN] · Language: English',
    pairWith: 'trinity-in-unity',
  },
  'trinity-in-unity': {
    slug: 'trinity-in-unity',
    number: 'Book Two',
    titleLead: 'Trinity',
    titleItalic: 'in Unity',
    titleTrail: '',
    breadcrumb: 'Trinity in Unity',
    subtitle: 'Themes with Three',
    coverVariant: 'B',
    coverTitle: 'Trinity',
    coverItalic: 'in Unity',
    coverSubtitle: 'Themes with Three',
    formats: [
      { id: 'paperback', name: 'Paperback', price: '$21.95' },
      { id: 'signed', name: 'Signed paperback', price: '[SIGNED PRICE]' },
      { id: 'ebook', name: 'eBook', price: '$11.95' },
    ],
    about: [
      'Trinity in Unity: Themes with Three explores the spiritual significance of the number three and how the rational, earthly and sensory levels of the mind work together in spiritual growth.',
      'Drawing on Swedenborgian teachings, Thomas Gontarz invites readers to see how divine wisdom moves through every level of experience — from highest truth to everyday living.',
    ],
    details:
      'Publisher: [PUBLISHER] · Pages: [PAGE COUNT] · ISBN: [ISBN] · Language: English',
    pairWith: 'heavenly-lessons',
  },
}

export function getBook(slug) {
  return BOOKS[slug] || null
}

export function getPairedBook(slug) {
  const book = getBook(slug)
  if (!book?.pairWith) return null
  return getBook(book.pairWith)
}
