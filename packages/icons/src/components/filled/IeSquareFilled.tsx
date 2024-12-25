import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import IeSquare from '../../svg/filled/ie-square.svg'
import type { IconProps } from '../../types'

export const IeSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(IeSquare, { className: 'ie-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
