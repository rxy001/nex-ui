'use client'

import { forwardRef } from 'react'
import { nex } from '@nex-ui/styled'
import type { CSSObject } from '@nex-ui/system'
import type { Ref, SVGProps, ReactNode } from 'react'

export const createIcon = (children: ReactNode, displayName?: string) => {
  const Icon = forwardRef(
    (
      props: SVGProps<SVGSVGElement> & { sx?: CSSObject },
      ref: Ref<SVGSVGElement>,
    ) => {
      return (
        <nex.svg
          xmlns='http://www.w3.org/2000/svg'
          width='1em'
          height='1em'
          aria-hidden
          focusable={false}
          viewBox='0 0 24 24'
          ref={ref}
          {...props}
        >
          {children}
        </nex.svg>
      )
    },
  )

  Icon.displayName = displayName || 'NexUIIcon'

  return Icon
}
