import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ArrowLeft from '../../svg/outlined/arrow-left.svg'
import type { IconProps } from '../../types'

export const ArrowLeftOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ArrowLeft, { className: 'arrow-left-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
