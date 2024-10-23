import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Build from '../../svg/outlined/build.svg'
import type { IconProps } from '../../types'

export const BuildOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Build, { className: 'build-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
