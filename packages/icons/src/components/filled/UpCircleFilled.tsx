import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import UpCircle from '../../svg/filled/up-circle.svg'
import type { IconProps } from '../../types'

export const UpCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(UpCircle, { className: 'up-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
