'use client'

import { usePathname } from 'next/navigation'
import { useMounted } from 'nextra/hooks'
import { Link } from '../../mdx-components/link'
import { useThemeConfig } from '../../stores'
import { getGitIssueUrl } from '../../utils'
import type { FC, ReactNode } from 'react'

export const NotFoundLink: FC<{
  children: ReactNode
  labels: string
}> = ({ children, labels }) => {
  const config = useThemeConfig()
  const pathname = usePathname()
  const mounted = useMounted()
  const ref = mounted && document.referrer
  const referrer = ref ? ` from "${ref}"` : ''

  return (
    <Link
      className='x:mt-6'
      href={getGitIssueUrl({
        repository: config.docsRepositoryBase,
        title: `Found broken "${mounted ? pathname : ''}" link${referrer}. Please fix!`,
        labels,
      })}
    >
      {children}
    </Link>
  )
}
