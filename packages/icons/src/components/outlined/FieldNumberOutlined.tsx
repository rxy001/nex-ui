'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FieldNumber from '../../svg/outlined/field-number.svg'
import type { IconProps } from '../../types'

export const FieldNumberOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FieldNumber, { className: 'field-number-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FieldNumberOutlined.displayName = 'FieldNumberOutlined'
