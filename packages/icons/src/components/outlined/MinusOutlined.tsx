import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Minus from '../../svg/outlined/minus.svg'
import type { IconProps } from '../../types'

export const MinusOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Minus, { className: 'minus-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
