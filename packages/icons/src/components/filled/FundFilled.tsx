import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Fund from '../../svg/filled/fund.svg'
import type { IconProps } from '../../types'

export const FundFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Fund, { className: 'fund-filled' })
  return <Icon {...props} ref={ref} />
})
