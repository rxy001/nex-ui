import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import OneToOne from '../../svg/outlined/one-to-one.svg'
import type { IconProps } from '../../types'

export const OneToOneOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(OneToOne)
    return <Icon {...props} ref={ref} />
  },
)
