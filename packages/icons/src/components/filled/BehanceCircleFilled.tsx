import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import BehanceCircle from '../../svg/filled/behance-circle.svg'
import type { IconProps } from '../../types'

export const BehanceCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(BehanceCircle, {
      className: 'behance-circle-filled',
    })
    return <Icon {...props} ref={ref} />
  },
)
