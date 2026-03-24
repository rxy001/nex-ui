'use client'

import { nex } from '@nex-ui/styled'
import type { Interpolation } from '@nex-ui/system'
import type { SVGProps, ReactNode } from 'react'

export function createIcon(children: ReactNode, displayName?: string) {
  function Icon(props: SVGProps<SVGSVGElement> & { sx?: Interpolation }) {
    return (
      <nex.svg
        xmlns='http://www.w3.org/2000/svg'
        width='1em'
        height='1em'
        aria-hidden
        focusable={false}
        viewBox='0 0 24 24'
        {...props}
      >
        {children}
      </nex.svg>
    )
  }

  Icon.displayName = displayName || 'NexUIIcon'

  return Icon
}
