import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bold from '../../svg/outlined/bold.svg'
import type { IconProps } from '../../types'

export const BoldOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Bold, { className: 'bold-outlined' })
  return <Icon {...props} ref={ref} />
})
