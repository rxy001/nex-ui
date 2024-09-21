import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import GooglePlusSquare from '../../svg/filled/google-plus-square.svg'
import type { IconProps } from '../../types'

export const GooglePlusSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(GooglePlusSquare)
    return <Icon {...props} ref={ref} />
  },
)
