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
    const props = useDefaultProps({
      name: 'Box',
      props: inProps,
    })

    return <nex.div {...props} ref={ref} />
  },
)

Box.displayName = 'Box'
