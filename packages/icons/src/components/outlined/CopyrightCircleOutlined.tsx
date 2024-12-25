import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CopyrightCircle from '../../svg/outlined/copyright-circle.svg'
import type { IconProps } from '../../types'

export const CopyrightCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(CopyrightCircle, { className: 'copyright-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
