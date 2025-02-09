'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Italic from '../../svg/outlined/italic.svg'
import type { IconProps } from '../../types'

export const ItalicOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Italic, { className: 'italic-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ItalicOutlined.displayName = 'ItalicOutlined'
