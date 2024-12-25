import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Build from '../../svg/filled/build.svg'
import type { IconProps } from '../../types'

export const BuildFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Build, { className: 'build-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
