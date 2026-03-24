'use client'

import { usePathname } from 'next/navigation'
import { useThemeConfig } from '../stores'
import type { ReactNode } from 'react'

export function LastUpdated({
  date,
  children = 'Last updated on',
  locale = 'en',
}: {
  date?: Date
  children?: ReactNode
  locale?: string
}) {
  const { i18n } = useThemeConfig()
  const pathname = usePathname()

  if (!date) {
    return null
  }

  const dateLocale = i18n.length ? pathname.split('/', 2)[1] : locale
  return (
    <>
      {children}{' '}
      <time
        dateTime={date.toISOString()}
        // Can provoke React 418 error https://react.dev/errors/418
        suppressHydrationWarning
      >
        {date.toLocaleDateString(dateLocale, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </time>
    </>
  )
}
