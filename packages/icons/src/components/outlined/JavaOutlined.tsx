import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Java from '../../svg/outlined/java.svg'
import type { IconProps } from '../../types'

export const JavaOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Java, { className: 'java-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

JavaOutlined.displayName = 'JavaOutlined'
