import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Fund from '../../svg/outlined/fund.svg'
import type { IconProps } from '../../types'

export const FundOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Fund, { className: 'fund-outlined' })
  return <Icon {...props} ref={ref} />
})
