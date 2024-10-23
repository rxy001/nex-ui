import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderLeft from '../../svg/outlined/border-left.svg'
import type { IconProps } from '../../types'

export const BorderLeftOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(BorderLeft, { className: 'border-left-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
