import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Fork from '../../svg/outlined/fork.svg'
import type { IconProps } from '../../types'

export const ForkOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Fork, { className: 'fork-outlined' })
  return <Icon {...props} ref={ref} />
})
