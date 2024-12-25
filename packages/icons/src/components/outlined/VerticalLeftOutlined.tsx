import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import VerticalLeft from '../../svg/outlined/vertical-left.svg'
import type { IconProps } from '../../types'

export const VerticalLeftOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(VerticalLeft, { className: 'vertical-left-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
