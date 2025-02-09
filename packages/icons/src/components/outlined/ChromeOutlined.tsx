'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Chrome from '../../svg/outlined/chrome.svg'
import type { IconProps } from '../../types'

export const ChromeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Chrome, { className: 'chrome-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ChromeOutlined.displayName = 'ChromeOutlined'
