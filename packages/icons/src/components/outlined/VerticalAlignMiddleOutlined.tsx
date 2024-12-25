import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import VerticalAlignMiddle from '../../svg/outlined/vertical-align-middle.svg'
import type { IconProps } from '../../types'

export const VerticalAlignMiddleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(VerticalAlignMiddle, {
          className: 'vertical-align-middle-outlined',
        }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
