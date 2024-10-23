import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Info from '../../svg/outlined/info.svg'
import type { IconProps } from '../../types'

export const InfoOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Info, { className: 'info-outlined' })
  return <Icon {...props} ref={ref} />
})
