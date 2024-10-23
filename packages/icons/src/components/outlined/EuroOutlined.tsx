import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Euro from '../../svg/outlined/euro.svg'
import type { IconProps } from '../../types'

export const EuroOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Euro, { className: 'euro-outlined' })
  return <Icon {...props} ref={ref} />
})
