import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import MinusSquare from '../../svg/outlined/minus-square.svg'
import type { IconProps } from '../../types'

export const MinusSquareOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(MinusSquare, { className: 'minus-square-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
