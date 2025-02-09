'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FundProjectionScreen from '../../svg/outlined/fund-projection-screen.svg'
import type { IconProps } from '../../types'

export const FundProjectionScreenOutlined = forwardRef<
  SVGSVGElement,
  IconProps
>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () =>
      createIcon(FundProjectionScreen, {
        className: 'fund-projection-screen-outlined',
      }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

FundProjectionScreenOutlined.displayName = 'FundProjectionScreenOutlined'
