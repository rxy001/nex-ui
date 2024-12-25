import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import TikTok from '../../svg/outlined/tik-tok.svg'
import type { IconProps } from '../../types'

export const TikTokOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(TikTok, { className: 'tik-tok-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
