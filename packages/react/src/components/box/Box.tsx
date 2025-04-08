'use client'

import { nex } from '@nex-ui/styled'
import type { Ref, ElementType } from 'react'
import { forwardRef, useSlotProps } from '../utils'
import type { BoxProps } from './types'

export const Box = forwardRef(
  <RootComponent extends ElementType = 'div'>(
    inProps: BoxProps<RootComponent>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const rootProps = useSlotProps({
      externalForwardedProps: inProps as BoxProps,
      additionalProps: {
        ref,
      },
    })

    return <nex.div {...rootProps} />
  },
)

Box.displayName = 'Box'
