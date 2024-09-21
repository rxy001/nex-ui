import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import MediumSquare from '../../svg/filled/medium-square.svg'
import type { IconProps } from '../../types'

export const MediumSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(MediumSquare)
    return <Icon {...props} ref={ref} />
  },
)
