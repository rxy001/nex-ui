'use client'

import { useSlot } from '../utils'
import type { ElementType } from 'react'
import type { BoxProps } from './types'

export const Box = <RootComponent extends ElementType = 'div'>(
  props: BoxProps<RootComponent>,
) => {
  const [BoxRoot, getBoxRootProps] = useSlot({
    elementType: 'div',
    externalForwardedProps: props as BoxProps,
  })

  return <BoxRoot {...getBoxRootProps()} />
}

Box.displayName = 'Box'
