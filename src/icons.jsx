export function IconSearch() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </svg>
  )
}

export function IconAccount() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-4.5 4-6.5 8-6.5s7 2 8 6.5" />
    </svg>
  )
}

export function IconCart() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 8h14l-1.2 12H6.2L5 8z" />
      <path d="M9 8V6a3 3 0 016 0v2" />
    </svg>
  )
}

export function CompassMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" stroke="#E2B259" strokeWidth="1.2">
      <circle cx="50" cy="50" r="12" />
      <circle cx="50" cy="50" r="30" />
      <path d="M50 4V96M4 50H96M17 17L83 83M83 17L17 83" />
    </svg>
  )
}

export function TrinityMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" stroke="#E2B259" strokeWidth="1.2">
      <path d="M50 8L92 82H8Z" />
      <path d="M50 32L73 72H27Z" />
      <circle cx="50" cy="58" r="6" />
    </svg>
  )
}

export function IconJournal() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" stroke="#E2B259" strokeWidth="1.2">
      <rect x="24" y="12" width="52" height="76" rx="12" />
      <path d="M32 12V88" />
      <circle cx="55" cy="42" r="10" />
      <path d="M55 28V56M41 42H69" />
      <path d="M44 70H66" />
    </svg>
  )
}

export function IconPrint() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" stroke="#E2B259" strokeWidth="1.2">
      <rect x="14" y="14" width="72" height="72" rx="16" />
      <rect x="22" y="22" width="56" height="56" rx="12" />
      <circle cx="50" cy="50" r="10" />
      <path d="M50 26V74M26 50H74M33 33L67 67M67 33L33 67" />
    </svg>
  )
}

export function IconMug() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" stroke="#E2B259" strokeWidth="1.2">
      <path d="M22 28H68V70Q68 84 54 84H36Q22 84 22 70Z" />
      <path d="M68 38H76Q86 38 86 50Q86 62 76 62H68" />
      <circle cx="45" cy="54" r="8" />
      <path d="M45 42V66M33 54H57" />
    </svg>
  )
}

export function IconTote() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" stroke="#E2B259" strokeWidth="1.2">
      <path d="M24 36H76Q80 36 81 40L84 84Q84 90 78 90H22Q16 90 16 84L19 40Q20 36 24 36Z" />
      <path d="M36 36V26Q36 14 50 14Q64 14 64 26V36" />
      <circle cx="50" cy="62" r="10" />
      <path d="M50 48V76M36 62H64" />
    </svg>
  )
}

export function IconCandle() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" stroke="#E2B259" strokeWidth="1.2">
      <rect x="26" y="46" width="48" height="42" rx="12" />
      <path d="M50 46V38" />
      <path d="M50 12Q40 24 50 36Q60 24 50 12Z" />
      <path d="M36 66H64" />
    </svg>
  )
}

export function IconNotecards() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" stroke="#E2B259" strokeWidth="1.2">
      <rect x="14" y="26" width="58" height="44" rx="10" transform="rotate(-8 43 48)" />
      <rect x="28" y="32" width="58" height="44" rx="10" />
      <path d="M28 32L57 58L86 32" />
    </svg>
  )
}

export function BookCover({
  variant = 'A',
  size = 'md',
  subtitle,
  title,
  italic,
  className = '',
}) {
  const Mark = variant === 'A' ? CompassMark : TrinityMark
  return (
    <div
      className={`cover c${variant} cover-${size} cover-static ${className}`.trim()}
    >
      <div className="au">Thomas Gontarz</div>
      <Mark />
      <div>
        <div className="ti">
          {title}
          <em>{italic}</em>
        </div>
        {subtitle ? <div className="su">{subtitle}</div> : null}
      </div>
    </div>
  )
}
