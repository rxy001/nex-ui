import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Build from '../../svg/outlined/build.svg'
import type { IconProps } from '../../types'

export const BuildOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Build, { className: 'build-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BuildOutlined.displayName = 'BuildOutlined'
