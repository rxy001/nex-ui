import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dislike from '../../svg/filled/dislike.svg'
import type { IconProps } from '../../types'

export const DislikeFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Dislike)
    return <Icon {...props} ref={ref} />
  },
)
