import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Meh from '../../svg/outlined/meh.svg'
import type { IconProps } from '../../types'

export const MehOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Meh, { className: 'meh-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MehOutlined.displayName = 'MehOutlined'
