import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PicLeft from '../../svg/outlined/pic-left.svg'
import type { IconProps } from '../../types'

export const PicLeftOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PicLeft, { className: 'pic-left-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PicLeftOutlined.displayName = 'PicLeftOutlined'
