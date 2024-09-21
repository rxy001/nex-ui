import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Codepen from '../../svg/outlined/codepen.svg'
import type { IconProps } from '../../types'

export const CodepenOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Codepen)
    return <Icon {...props} ref={ref} />
  },
)
