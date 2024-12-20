import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DeleteRow from '../../svg/outlined/delete-row.svg'
import type { IconProps } from '../../types'

export const DeleteRowOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DeleteRow, { className: 'delete-row-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
