import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Strikethrough from '../../svg/outlined/strikethrough.svg'
import type { IconProps } from '../../types'

export const StrikethroughOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Strikethrough, { className: 'strikethrough-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
