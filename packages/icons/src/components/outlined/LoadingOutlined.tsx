import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Loading from '../../svg/outlined/loading.svg'
import type { IconProps } from '../../types'

export const LoadingOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Loading, { spin: true })
    return <Icon {...props} ref={ref} />
  },
)
