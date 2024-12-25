import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DeleteColumn from '../../svg/outlined/delete-column.svg'
import type { IconProps } from '../../types'

export const DeleteColumnOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DeleteColumn, { className: 'delete-column-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
