import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dribbble from '../../svg/outlined/dribbble.svg'
import type { IconProps } from '../../types'

export const DribbbleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Dribbble, { className: 'dribbble-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
