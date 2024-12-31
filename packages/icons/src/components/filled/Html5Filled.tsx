import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Html5 from '../../svg/filled/html5.svg'
import type { IconProps } from '../../types'

export const Html5Filled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Html5, { className: 'html5-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

Html5Filled.displayName = 'Html5Filled'
