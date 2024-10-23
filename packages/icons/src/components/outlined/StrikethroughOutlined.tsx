import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Strikethrough from '../../svg/outlined/strikethrough.svg'
import type { IconProps } from '../../types'

export const StrikethroughOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Strikethrough, {
      className: 'strikethrough-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
