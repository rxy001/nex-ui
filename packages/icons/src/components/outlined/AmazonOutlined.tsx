import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Amazon from '../../svg/outlined/amazon.svg'
import type { IconProps } from '../../types'

export const AmazonOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Amazon, { className: 'amazon-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
