'use client'

import { nex } from '@nex-ui/styled'
import type { Ref, ElementType } from 'react'
import { forwardRef, useDefaultProps, useSlotProps } from '../utils'
import type { BoxProps } from './types'

export const Box = forwardRef(
  <RootComponent extends ElementType = 'div'>(
    inProps: BoxProps<RootComponent>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const props = useDefaultProps<BoxProps>({
      name: 'Box',
      props: inProps,
    })

    const rootProps = useSlotProps({
      externalForwardedProps: props,
      additionalProps: {
        ref,
      },
    })

    return <nex.div {...rootProps} />
  },
)

Box.displayName = 'Box'
