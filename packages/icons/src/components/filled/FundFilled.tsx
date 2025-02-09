'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Fund from '../../svg/filled/fund.svg'
import type { IconProps } from '../../types'

export const FundFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Fund, { className: 'fund-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

FundFilled.displayName = 'FundFilled'
