import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Skin from '../../svg/outlined/skin.svg'
import type { IconProps } from '../../types'

export const SkinOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Skin, { className: 'skin-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
