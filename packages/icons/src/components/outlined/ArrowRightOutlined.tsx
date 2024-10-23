import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ArrowRight from '../../svg/outlined/arrow-right.svg'
import type { IconProps } from '../../types'

export const ArrowRightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ArrowRight, { className: 'arrow-right-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
