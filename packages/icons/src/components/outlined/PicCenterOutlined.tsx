import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PicCenter from '../../svg/outlined/pic-center.svg'
import type { IconProps } from '../../types'

export const PicCenterOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PicCenter, { className: 'pic-center-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
