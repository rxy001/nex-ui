import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Read from '../../svg/outlined/read.svg'
import type { IconProps } from '../../types'

export const ReadOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Read, { className: 'read-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ReadOutlined.displayName = 'ReadOutlined'
