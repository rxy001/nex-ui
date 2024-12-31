import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Info from '../../svg/outlined/info.svg'
import type { IconProps } from '../../types'

export const InfoOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Info, { className: 'info-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

InfoOutlined.displayName = 'InfoOutlined'
