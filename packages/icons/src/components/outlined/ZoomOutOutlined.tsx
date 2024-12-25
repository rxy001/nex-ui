import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ZoomOut from '../../svg/outlined/zoom-out.svg'
import type { IconProps } from '../../types'

export const ZoomOutOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ZoomOut, { className: 'zoom-out-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
