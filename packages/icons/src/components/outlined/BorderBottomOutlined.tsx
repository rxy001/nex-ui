import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderBottom from '../../svg/outlined/border-bottom.svg'
import type { IconProps } from '../../types'

export const BorderBottomOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(BorderBottom, { className: 'border-bottom-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
