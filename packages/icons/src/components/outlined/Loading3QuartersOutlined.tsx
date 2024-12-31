import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Loading3Quarters from '../../svg/outlined/loading-3-quarters.svg'
import type { IconProps } from '../../types'

export const Loading3QuartersOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(Loading3Quarters, {
          spin: true,
          className: 'loading-3-quarters-outlined',
        }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

Loading3QuartersOutlined.displayName = 'Loading3QuartersOutlined'
