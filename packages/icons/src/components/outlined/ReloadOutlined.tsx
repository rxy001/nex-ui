import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Reload from '../../svg/outlined/reload.svg'
import type { IconProps } from '../../types'

export const ReloadOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Reload, { className: 'reload-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
