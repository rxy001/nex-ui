import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CiCircle from '../../svg/filled/ci-circle.svg'
import type { IconProps } from '../../types'

export const CiCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CiCircle, { className: 'ci-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
