import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Eye from '../../svg/outlined/eye.svg'
import type { IconProps } from '../../types'

export const EyeOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Eye, { className: 'eye-outlined' })
  return <Icon {...props} ref={ref} />
})
