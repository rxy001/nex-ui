'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Phone from '../../svg/filled/phone.svg'
import type { IconProps } from '../../types'

export const PhoneFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Phone, { className: 'phone-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PhoneFilled.displayName = 'PhoneFilled'
