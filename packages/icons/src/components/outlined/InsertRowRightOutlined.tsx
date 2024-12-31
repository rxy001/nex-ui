import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import InsertRowRight from '../../svg/outlined/insert-row-right.svg'
import type { IconProps } from '../../types'

export const InsertRowRightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(InsertRowRight, { className: 'insert-row-right-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

InsertRowRightOutlined.displayName = 'InsertRowRightOutlined'
