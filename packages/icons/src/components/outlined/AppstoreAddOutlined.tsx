import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import AppstoreAdd from '../../svg/outlined/appstore-add.svg'
import type { IconProps } from '../../types'

export const AppstoreAddOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(AppstoreAdd)
    return <Icon {...props} ref={ref} />
  },
)
