import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CiCircle from '../../svg/outlined/ci-circle.svg'
import type { IconProps } from '../../types'

export const CiCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CiCircle, { className: 'ci-circle-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
