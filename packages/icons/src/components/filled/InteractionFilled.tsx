import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Interaction from '../../svg/filled/interaction.svg'
import type { IconProps } from '../../types'

export const InteractionFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Interaction, { className: 'interaction-filled' })
    return <Icon {...props} ref={ref} />
  },
)
