import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Interaction from '../../svg/outlined/interaction.svg'
import type { IconProps } from '../../types'

export const InteractionOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Interaction, { className: 'interaction-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

InteractionOutlined.displayName = 'InteractionOutlined'
