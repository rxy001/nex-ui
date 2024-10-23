import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Global from '../../svg/outlined/global.svg'
import type { IconProps } from '../../types'

export const GlobalOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Global, { className: 'global-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
