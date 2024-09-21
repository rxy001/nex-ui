import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Merge from '../../svg/outlined/merge.svg'
import type { IconProps } from '../../types'

export const MergeOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Merge)
    return <Icon {...props} ref={ref} />
  },
)
