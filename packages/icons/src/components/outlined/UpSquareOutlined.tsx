import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import UpSquare from '../../svg/outlined/up-square.svg'
import type { IconProps } from '../../types'

export const UpSquareOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(UpSquare, { className: 'up-square-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

UpSquareOutlined.displayName = 'UpSquareOutlined'
