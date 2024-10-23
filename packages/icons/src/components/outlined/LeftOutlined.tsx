import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Left from '../../svg/outlined/left.svg'
import type { IconProps } from '../../types'

export const LeftOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Left, { className: 'left-outlined' })
  return <Icon {...props} ref={ref} />
})
