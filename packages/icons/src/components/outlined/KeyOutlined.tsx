'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Key from '../../svg/outlined/key.svg'
import type { IconProps } from '../../types'

export const KeyOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Key, { className: 'key-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

KeyOutlined.displayName = 'KeyOutlined'
