import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Gold from '../../svg/outlined/gold.svg'
import type { IconProps } from '../../types'

export const GoldOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Gold)
  return <Icon {...props} ref={ref} />
})
