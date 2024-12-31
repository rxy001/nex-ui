import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import InsertRowBelow from '../../svg/outlined/insert-row-below.svg'
import type { IconProps } from '../../types'

export const InsertRowBelowOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(InsertRowBelow, { className: 'insert-row-below-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

InsertRowBelowOutlined.displayName = 'InsertRowBelowOutlined'
