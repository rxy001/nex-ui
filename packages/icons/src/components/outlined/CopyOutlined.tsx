import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Copy from '../../svg/outlined/copy.svg'
import type { IconProps } from '../../types'

export const CopyOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Copy, { className: 'copy-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CopyOutlined.displayName = 'CopyOutlined'
