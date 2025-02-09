'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Block from '../../svg/outlined/block.svg'
import type { IconProps } from '../../types'

export const BlockOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Block, { className: 'block-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BlockOutlined.displayName = 'BlockOutlined'
