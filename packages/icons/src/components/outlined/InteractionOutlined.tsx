import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Interaction from '../../svg/outlined/interaction.svg'
import type { IconProps } from '../../types'

export const InteractionOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Interaction, { className: 'interaction-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
