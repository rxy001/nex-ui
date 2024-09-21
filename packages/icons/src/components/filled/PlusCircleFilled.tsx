import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PlusCircle from '../../svg/filled/plus-circle.svg'
import type { IconProps } from '../../types'

export const PlusCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PlusCircle)
    return <Icon {...props} ref={ref} />
  },
)
