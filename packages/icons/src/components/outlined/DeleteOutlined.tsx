import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Delete from '../../svg/outlined/delete.svg'
import type { IconProps } from '../../types'

export const DeleteOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Delete, { className: 'delete-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
