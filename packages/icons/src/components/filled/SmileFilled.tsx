import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Smile from '../../svg/filled/smile.svg'
import type { IconProps } from '../../types'

export const SmileFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Smile, { className: 'smile-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
