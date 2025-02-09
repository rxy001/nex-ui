'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Insurance from '../../svg/filled/insurance.svg'
import type { IconProps } from '../../types'

export const InsuranceFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Insurance, { className: 'insurance-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

InsuranceFilled.displayName = 'InsuranceFilled'
