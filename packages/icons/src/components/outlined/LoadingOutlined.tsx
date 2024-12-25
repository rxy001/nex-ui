import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Loading from '../../svg/outlined/loading.svg'
import type { IconProps } from '../../types'

export const LoadingOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Loading, { spin: true, className: 'loading-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
