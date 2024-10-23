import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Skin from '../../svg/outlined/skin.svg'
import type { IconProps } from '../../types'

export const SkinOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Skin, { className: 'skin-outlined' })
  return <Icon {...props} ref={ref} />
})
