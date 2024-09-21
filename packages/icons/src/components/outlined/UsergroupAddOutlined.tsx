import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import UsergroupAdd from '../../svg/outlined/usergroup-add.svg'
import type { IconProps } from '../../types'

export const UsergroupAddOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(UsergroupAdd)
    return <Icon {...props} ref={ref} />
  },
)
