import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Idcard from '../../svg/outlined/idcard.svg'
import type { IconProps } from '../../types'

export const IdcardOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Idcard)
    return <Icon {...props} ref={ref} />
  },
)
