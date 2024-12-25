import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PlusSquare from '../../svg/outlined/plus-square.svg'
import type { IconProps } from '../../types'

export const PlusSquareOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PlusSquare, { className: 'plus-square-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
