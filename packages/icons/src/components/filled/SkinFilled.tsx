import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Skin from '../../svg/filled/skin.svg'
import type { IconProps } from '../../types'

export const SkinFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Skin, { className: 'skin-filled' })
  return <Icon {...props} ref={ref} />
})
