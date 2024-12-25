import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Api from '../../svg/outlined/api.svg'
import type { IconProps } from '../../types'

export const ApiOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Api, { className: 'api-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
