import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Underline from '../../svg/outlined/underline.svg'
import type { IconProps } from '../../types'

export const UnderlineOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Underline, { className: 'underline-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
