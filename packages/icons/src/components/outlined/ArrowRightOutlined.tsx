import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ArrowRight from '../../svg/outlined/arrow-right.svg'
import type { IconProps } from '../../types'

export const ArrowRightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ArrowRight, { className: 'arrow-right-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ArrowRightOutlined.displayName = 'ArrowRightOutlined'
