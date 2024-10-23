import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import UsergroupDelete from '../../svg/outlined/usergroup-delete.svg'
import type { IconProps } from '../../types'

export const UsergroupDeleteOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(UsergroupDelete, {
      className: 'usergroup-delete-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
