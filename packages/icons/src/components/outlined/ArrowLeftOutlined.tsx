import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ArrowLeft from '../../svg/outlined/arrow-left.svg'
import type { IconProps } from '../../types'

export const ArrowLeftOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ArrowLeft, { className: 'arrow-left-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
