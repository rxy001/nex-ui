import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Unlock from '../../svg/filled/unlock.svg'
import type { IconProps } from '../../types'

export const UnlockFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Unlock, { className: 'unlock-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

UnlockFilled.displayName = 'UnlockFilled'
