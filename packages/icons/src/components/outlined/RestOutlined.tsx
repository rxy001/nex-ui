import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Rest from '../../svg/outlined/rest.svg'
import type { IconProps } from '../../types'

export const RestOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Rest, { className: 'rest-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
