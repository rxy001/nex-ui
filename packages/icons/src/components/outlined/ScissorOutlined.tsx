import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Scissor from '../../svg/outlined/scissor.svg'
import type { IconProps } from '../../types'

export const ScissorOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Scissor, { className: 'scissor-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
