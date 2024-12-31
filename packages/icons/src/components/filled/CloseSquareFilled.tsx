import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CloseSquare from '../../svg/filled/close-square.svg'
import type { IconProps } from '../../types'

export const CloseSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CloseSquare, { className: 'close-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CloseSquareFilled.displayName = 'CloseSquareFilled'
