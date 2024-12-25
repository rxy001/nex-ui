import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderLeft from '../../svg/outlined/border-left.svg'
import type { IconProps } from '../../types'

export const BorderLeftOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(BorderLeft, { className: 'border-left-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
