import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Aliwangwang from '../../svg/outlined/aliwangwang.svg'
import type { IconProps } from '../../types'

export const AliwangwangOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Aliwangwang, { className: 'aliwangwang-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
