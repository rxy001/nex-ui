'use client'

import { nex } from '@nex-ui/styled'
import type { ElementType } from 'react'
import { useSlotProps } from '../utils'
import type { BoxProps } from './types'

export const Box = <RootComponent extends ElementType = 'div'>(
  props: BoxProps<RootComponent>,
) => {
  const rootProps = useSlotProps({
    externalForwardedProps: props as BoxProps,
    additionalProps: {
      as: props.as || 'div',
    },
  })

  return <nex.div {...rootProps} />
}

Box.displayName = 'Box'
