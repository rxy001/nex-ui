import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CloseSquare from '../../svg/outlined/close-square.svg'
import type { IconProps } from '../../types'

export const CloseSquareOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CloseSquare, { className: 'close-square-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CloseSquareOutlined.displayName = 'CloseSquareOutlined'
