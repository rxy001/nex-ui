import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Skin from '../../svg/filled/skin.svg'
import type { IconProps } from '../../types'

export const SkinFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Skin, { className: 'skin-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
