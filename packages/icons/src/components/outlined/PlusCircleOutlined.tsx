import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PlusCircle from '../../svg/outlined/plus-circle.svg'
import type { IconProps } from '../../types'

export const PlusCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PlusCircle, { className: 'plus-circle-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
