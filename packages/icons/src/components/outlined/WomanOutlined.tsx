import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Woman from '../../svg/outlined/woman.svg'
import type { IconProps } from '../../types'

export const WomanOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Woman)
    return <Icon {...props} ref={ref} />
  },
)
