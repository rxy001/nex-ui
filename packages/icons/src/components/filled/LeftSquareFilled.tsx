import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import LeftSquare from '../../svg/filled/left-square.svg'
import type { IconProps } from '../../types'

export const LeftSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(LeftSquare, { className: 'left-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

LeftSquareFilled.displayName = 'LeftSquareFilled'
