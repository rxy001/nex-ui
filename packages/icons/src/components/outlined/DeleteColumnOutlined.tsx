import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DeleteColumn from '../../svg/outlined/delete-column.svg'
import type { IconProps } from '../../types'

export const DeleteColumnOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DeleteColumn)
    return <Icon {...props} ref={ref} />
  },
)
