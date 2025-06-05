'use client'

import cn from 'clsx'
import { cloneElement, useEffect } from 'react'
import { Breadcrumb, Pagination, TOC } from '../components'
import { setToc, useConfig, useThemeConfig } from '../stores'
import type { MDXWrapper } from 'nextra'

export const ClientWrapper: MDXWrapper = ({
  toc,
  children,
  metadata,
  bottomContent,
}) => {
  const {
    activeType,
    activeThemeContext: themeContext,
    activePath,
  } = useConfig().normalizePagesResult

  const themeConfig = useThemeConfig()

  const date = themeContext.timestamp && metadata.timestamp

  // We can't update store in server component so doing it in client component
  useEffect(() => {
    setToc(toc)
  }, [toc])

  return (
    <>
      {(themeContext.layout === 'default' || themeContext.toc) && (
        <nav
          className='nextra-toc x:order-last x:max-xl:hidden x:w-64 x:shrink-0 x:print:hidden'
          aria-label='table of contents'
        >
          {themeContext.toc && (
            // eslint-disable-next-line react/jsx-pascal-case
            <TOC
              toc={toc}
              filePath={metadata.filePath}
              pageTitle={metadata.title}
            />
          )}
        </nav>
      )}
      <article
        className={cn(
          'x:w-full x:min-w-0 x:break-words x:min-h-[calc(100vh-var(--nextra-navbar-height))]',
          'x:text-slate-700 x:dark:text-slate-200 x:pb-8 x:px-4 x:pt-4 x:md:px-12',
          themeContext.typesetting === 'article' &&
            'nextra-body-typesetting-article',
        )}
      >
        {themeContext.breadcrumb && activeType !== 'page' && (
          <Breadcrumb activePath={activePath} />
        )}
        {children}
        {date ? (
          <div className='x:mt-12 x:mb-8 x:text-xs x:text-gray-500 x:text-end x:dark:text-gray-400'>
            {cloneElement(themeConfig.lastUpdated, { date: new Date(date) })}
          </div>
        ) : null}
        {themeContext.pagination && activeType !== 'page' && <Pagination />}
        {bottomContent}
        {themeContext.footer && themeConfig.footer}
      </article>
    </>
  )
}
