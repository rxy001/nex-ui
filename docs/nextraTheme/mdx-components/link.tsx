import cn from 'clsx'
import NextLink from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

export const EXTERNAL_URL_RE = /^https?:\/\//

export const Link = ({
  className: classNameProp,
  href = '',
  ...props
}: ComponentPropsWithoutRef<'a'>) => {
  const className = cn(
    'x:text-primary-700 x:underline x:hover:text-primary-500 x:decoration-from-font x:[text-underline-position:from-font]',
    classNameProp,
  )

  if (EXTERNAL_URL_RE.test(href)) {
    const { children } = props
    return (
      <a
        href={href}
        className={className}
        target='_blank'
        rel='noreferrer'
        {...props}
      >
        {children}
      </a>
    )
  }
  const ComponentToUse = href.startsWith('#') ? 'a' : NextLink
  return <ComponentToUse href={href} className={className} {...props} />
}
