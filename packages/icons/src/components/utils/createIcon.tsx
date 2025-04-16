'use client'

import { forwardRef } from 'react'
import { nex } from '@nex-ui/styled'
import type { CSSObject } from '@nex-ui/system'
import type { Ref, ComponentType, SVGProps } from 'react'

export const createIcon = (
  Component: ComponentType<SVGProps<SVGSVGElement>>,
  displayName?: string,
) => {
  const Icon = forwardRef(
    (
      props: SVGProps<SVGSVGElement> & { sx?: CSSObject },
      ref: Ref<SVGSVGElement>,
    ) => {
      return (
        <nex.svg
          as={Component}
          aria-hidden
          focusable={false}
          ref={ref}
          {...props}
        />
      )
    },
  )

  Icon.displayName = displayName || 'NexUIIcon'

  return Icon
}
