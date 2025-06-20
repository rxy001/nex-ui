import cn from 'clsx'
import NextLink from 'next/link'
import { ArrowRightIcon } from 'nextra/icons'
import { useConfig, useThemeConfig } from '../stores'
import type { FC } from 'react'

const classes = {
  link: cn(
    'x:focus-visible:nextra-focus x:text-gray-600 x:dark:text-gray-400',
    'x:hover:text-gray-800 x:dark:hover:text-gray-200',
    'x:contrast-more:text-gray-700 x:contrast-more:dark:text-gray-100',
    'x:flex x:max-w-[50%] x:items-center x:gap-1 x:py-4 x:text-base x:font-medium x:transition-colors x:[word-break:break-word] x:md:text-lg',
  ),
  icon: cn('x:inline x:shrink-0'),
}

export const Pagination: FC = () => {
  const { flatDocsDirectories, activeIndex } = useConfig().normalizePagesResult
  const { navigation } = useThemeConfig()

  let prev = navigation.prev && flatDocsDirectories[activeIndex - 1]
  let next = navigation.next && flatDocsDirectories[activeIndex + 1]

  if (prev && !prev.isUnderCurrentDocsTree) prev = false
  if (next && !next.isUnderCurrentDocsTree) next = false

  if (!prev && !next) return null

  return (
    <div
      className={cn(
        'x:mb-8 x:flex x:items-center x:border-t x:pt-8 nextra-border',
        'x:print:hidden',
      )}
    >
      {prev && (
        <NextLink
          href={prev.route}
          title={prev.title}
          className={cn(classes.link, 'x:pe-4')}
        >
          <ArrowRightIcon
            height='20'
            className={cn(classes.icon, 'x:ltr:rotate-180')}
          />
          {prev.title}
        </NextLink>
      )}
      {next && (
        <NextLink
          href={next.route}
          title={next.title}
          className={cn(classes.link, 'x:ps-4 x:ms-auto x:text-end')}
        >
          {next.title}
          <ArrowRightIcon
            height='20'
            className={cn(classes.icon, 'x:rtl:rotate-180')}
          />
        </NextLink>
      )}
    </div>
  )
}
