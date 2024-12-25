import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import GooglePlusSquare from '../../svg/filled/google-plus-square.svg'
import type { IconProps } from '../../types'

export const GooglePlusSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(GooglePlusSquare, {
          className: 'google-plus-square-filled',
        }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
