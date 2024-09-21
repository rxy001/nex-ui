import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CodepenCircle from '../../svg/outlined/codepen-circle.svg'
import type { IconProps } from '../../types'

export const CodepenCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CodepenCircle)
    return <Icon {...props} ref={ref} />
  },
)
