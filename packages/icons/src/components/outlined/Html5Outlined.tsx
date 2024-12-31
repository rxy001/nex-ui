import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Html5 from '../../svg/outlined/html5.svg'
import type { IconProps } from '../../types'

export const Html5Outlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Html5, { className: 'html5-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

Html5Outlined.displayName = 'Html5Outlined'
