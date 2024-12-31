import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sun from '../../svg/outlined/sun.svg'
import type { IconProps } from '../../types'

export const SunOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Sun, { className: 'sun-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SunOutlined.displayName = 'SunOutlined'
