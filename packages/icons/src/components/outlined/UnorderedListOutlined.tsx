'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import UnorderedList from '../../svg/outlined/unordered-list.svg'
import type { IconProps } from '../../types'

export const UnorderedListOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(UnorderedList, { className: 'unordered-list-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

UnorderedListOutlined.displayName = 'UnorderedListOutlined'
