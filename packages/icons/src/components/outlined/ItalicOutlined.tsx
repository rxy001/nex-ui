import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Italic from '../../svg/outlined/italic.svg'
import type { IconProps } from '../../types'

export const ItalicOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Italic, { className: 'italic-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
