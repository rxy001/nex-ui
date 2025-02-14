'use client'

import { nex } from '@nex-ui/styled'
import type { Ref, ElementType } from 'react'
import { forwardRef, useDefaultProps } from '../utils'
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

    const { sx } = props

    return <nex.div {...props} sx={sx} ref={ref} />
  },
)

Box.displayName = 'Box'
