import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import MinusCircle from '../../svg/filled/minus-circle.svg'
import type { IconProps } from '../../types'

export const MinusCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(MinusCircle)
    return <Icon {...props} ref={ref} />
  },
)
