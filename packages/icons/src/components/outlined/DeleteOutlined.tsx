import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Delete from '../../svg/outlined/delete.svg'
import type { IconProps } from '../../types'

export const DeleteOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Delete, { className: 'delete-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
