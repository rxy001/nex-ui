import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import AmazonCircle from '../../svg/filled/amazon-circle.svg'
import type { IconProps } from '../../types'

export const AmazonCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(AmazonCircle, { className: 'amazon-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
