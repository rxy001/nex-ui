import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Interaction from '../../svg/filled/interaction.svg'
import type { IconProps } from '../../types'

export const InteractionFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Interaction, { className: 'interaction-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

InteractionFilled.displayName = 'InteractionFilled'
