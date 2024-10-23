import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import UpCircle from '../../svg/outlined/up-circle.svg'
import type { IconProps } from '../../types'

export const UpCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(UpCircle, { className: 'up-circle-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
