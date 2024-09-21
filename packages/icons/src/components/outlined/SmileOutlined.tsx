import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Smile from '../../svg/outlined/smile.svg'
import type { IconProps } from '../../types'

export const SmileOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Smile)
    return <Icon {...props} ref={ref} />
  },
)
