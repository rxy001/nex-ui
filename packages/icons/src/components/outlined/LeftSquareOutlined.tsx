import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import LeftSquare from '../../svg/outlined/left-square.svg'
import type { IconProps } from '../../types'

export const LeftSquareOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(LeftSquare, { className: 'left-square-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

LeftSquareOutlined.displayName = 'LeftSquareOutlined'
