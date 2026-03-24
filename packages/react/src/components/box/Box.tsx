'use client'

import { nex } from '@nex-ui/styled'
import type { ElementType } from 'react'
import type { BoxProps } from './types'

export function Box<RootComponent extends ElementType = 'div'>(
  props: BoxProps<RootComponent>,
) {
  return <nex.div {...props} />
}

Box.displayName = 'Box'
