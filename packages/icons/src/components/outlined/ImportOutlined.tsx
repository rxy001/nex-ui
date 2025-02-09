'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Import from '../../svg/outlined/import.svg'
import type { IconProps } from '../../types'

export const ImportOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Import, { className: 'import-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ImportOutlined.displayName = 'ImportOutlined'
