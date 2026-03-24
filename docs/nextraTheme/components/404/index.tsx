import cn from 'clsx'
import { H1 } from '../../mdx-components/heading'
import { NotFoundLink } from './index.client'
import type { ReactNode } from 'react'

type NotFoundPageProps = {
  content?: ReactNode
  labels?: string
  children?: ReactNode
  className?: string
}

export function NotFoundPage({
  content = 'Submit an issue about broken link',
  labels = 'bug',
  children,
  className,
}: NotFoundPageProps) {
  return (
    <div
      className={cn(
        'x:flex x:flex-col x:justify-center x:items-center x:h-[calc(100dvh-var(--nextra-navbar-height))]',
        className,
      )}
    >
      {children || <H1>404: Page Not Found</H1>}
      <NotFoundLink labels={labels}>{content}</NotFoundLink>
    </div>
  )
}
