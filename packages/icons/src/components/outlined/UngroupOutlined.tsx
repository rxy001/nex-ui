import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Ungroup from '../../svg/outlined/ungroup.svg'
import type { IconProps } from '../../types'

export const UngroupOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Ungroup, { className: 'ungroup-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
