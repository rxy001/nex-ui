import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ArrowDown from '../../svg/outlined/arrow-down.svg'
import type { IconProps } from '../../types'

export const ArrowDownOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ArrowDown, { className: 'arrow-down-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ArrowDownOutlined.displayName = 'ArrowDownOutlined'
