import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Rise from '../../svg/outlined/rise.svg'
import type { IconProps } from '../../types'

export const RiseOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Rise)
  return <Icon {...props} ref={ref} />
})
