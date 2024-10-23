import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Aliwangwang from '../../svg/filled/aliwangwang.svg'
import type { IconProps } from '../../types'

export const AliwangwangFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Aliwangwang, { className: 'aliwangwang-filled' })
    return <Icon {...props} ref={ref} />
  },
)
