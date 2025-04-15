'use client'

import { nex } from '@nex-ui/styled'
import { type Ref, type ElementType } from 'react'
import { forwardRef, useSlotProps } from '../utils'
import type { BoxProps } from './types'

export const Box = forwardRef(
  <RootComponent extends ElementType = 'div'>(
    props: BoxProps<RootComponent>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const rootProps = useSlotProps({
      externalForwardedProps: props as BoxProps,
      additionalProps: {
        ref,
        as: props.as || 'div',
      },
    })

    return <nex.div {...rootProps} />
  },
)

Box.displayName = 'Box'
