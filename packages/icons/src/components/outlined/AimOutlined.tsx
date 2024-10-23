import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Aim from '../../svg/outlined/aim.svg'
import type { IconProps } from '../../types'

export const AimOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Aim, { className: 'aim-outlined' })
  return <Icon {...props} ref={ref} />
})
