import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bilibili from '../../svg/filled/bilibili.svg'
import type { IconProps } from '../../types'

export const BilibiliFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Bilibili)
    return <Icon {...props} ref={ref} />
  },
)
