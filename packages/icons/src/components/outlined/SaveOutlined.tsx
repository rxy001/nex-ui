'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Save from '../../svg/outlined/save.svg'
import type { IconProps } from '../../types'

export const SaveOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Save, { className: 'save-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SaveOutlined.displayName = 'SaveOutlined'
