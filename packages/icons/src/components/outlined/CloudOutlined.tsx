import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Cloud from '../../svg/outlined/cloud.svg'
import type { IconProps } from '../../types'

export const CloudOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Cloud)
    return <Icon {...props} ref={ref} />
  },
)
