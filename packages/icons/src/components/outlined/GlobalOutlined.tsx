import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Global from '../../svg/outlined/global.svg'
import type { IconProps } from '../../types'

export const GlobalOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Global, { className: 'global-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

GlobalOutlined.displayName = 'GlobalOutlined'
