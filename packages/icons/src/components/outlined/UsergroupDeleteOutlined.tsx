import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import UsergroupDelete from '../../svg/outlined/usergroup-delete.svg'
import type { IconProps } from '../../types'

export const UsergroupDeleteOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(UsergroupDelete, { className: 'usergroup-delete-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
