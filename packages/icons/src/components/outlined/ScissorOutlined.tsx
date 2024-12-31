import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Scissor from '../../svg/outlined/scissor.svg'
import type { IconProps } from '../../types'

export const ScissorOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Scissor, { className: 'scissor-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ScissorOutlined.displayName = 'ScissorOutlined'
