import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import AmazonSquare from '../../svg/filled/amazon-square.svg'
import type { IconProps } from '../../types'

export const AmazonSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(AmazonSquare, { className: 'amazon-square-filled' })
    return <Icon {...props} ref={ref} />
  },
)
