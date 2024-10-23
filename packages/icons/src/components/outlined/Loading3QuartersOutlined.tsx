import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Loading3Quarters from '../../svg/outlined/loading-3-quarters.svg'
import type { IconProps } from '../../types'

export const Loading3QuartersOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Loading3Quarters, {
      spin: true,
      className: 'loading-3-quarters-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
