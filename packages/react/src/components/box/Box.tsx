'use client'

import { forwardRef } from 'react'
import { nex } from '@nex-ui/styled'
import type { BoxProps } from './types'

export const Box = forwardRef<any, BoxProps>((props: BoxProps, ref) => {
  return <nex.div ref={ref} {...props} />
})

Box.displayName = 'Box'
