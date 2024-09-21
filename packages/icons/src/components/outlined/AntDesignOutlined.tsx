import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import AntDesign from '../../svg/outlined/ant-design.svg'
import type { IconProps } from '../../types'

export const AntDesignOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(AntDesign)
    return <Icon {...props} ref={ref} />
  },
)
